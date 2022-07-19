import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:movil/models/user.dart';
import 'package:movil/providers/login_form_provider.dart';
import 'package:movil/providers/user_provider.dart';
import 'package:movil/services/EventoService.dart';
import 'package:movil/utils/user_secure_storage.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar : AppBar( 
        title:  Text("Title"),
      ),
     
      body : Padding(
        padding: EdgeInsets.symmetric(horizontal: 20.0),
        child: ChangeNotifierProvider(
          create :  (_) => LoginFormProvider(),
          child: _LoginForm(),
        ),
      ),
    );
  }
}

class _LoginForm extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
  final loginProvider = Provider.of<LoginFormProvider>(context);
  final userProvider = Provider.of<UserProvider>(context);
  return Form(
      key: loginProvider.formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Iniciar Sesion",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
          ),
          SizedBox(
            height: 10,
          ),
          TextFormField(
              onChanged: ( value ) => loginProvider.email = value,
            decoration: InputDecoration(
                icon: Icon(Icons.person),
                hintText: "Username",
                label: Text("Username")),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Username es requerdido';
              }
              return null;
            },
          ),
          SizedBox(
            height: 10,
          ),
          TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              icon: Icon(Icons.lock),
              hintText: "Password",
            ),
              onChanged: ( value ) => loginProvider.password = value,
              validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Password es requerdido';
              }
              return null;
              }
          ),
          SizedBox(
            height: 10,
          ),
          MaterialButton(
            color: Colors.blue,
            onPressed: () async{
              if(loginProvider.isValidForm()){
                final service = EventoService();
                bool res  = await service.login(loginProvider.email,loginProvider.password);
                if(res){
                  userProvider.user = User.fromJson(JwtDecoder.decode(await UserSecureStorage.getUser()) );
                  //Añaidr replacd
                  Navigator.pushReplacementNamed( context ,'/main' );
                }else{
                  showDialog(context: context, builder: (context)=>_AlertDialog());
                }
              }
            },
            child: 
                Text("Iniciar Sesion"),
          ),
        ],
      ),
    );
  }
}

class _AlertDialog extends StatelessWidget {
  const _AlertDialog({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text("Iniciar Sesion Error"),
      content: Text("Error en el usuario o contraseña"),
      actions: [
        TextButton(onPressed: (){
          Navigator.pop(context);
        }, child: 
          Text("Aceptar")
        )
      ],
    );
  }
}