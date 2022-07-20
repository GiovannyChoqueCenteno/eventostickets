import 'package:app_scanner/const/theme.dart';
import 'package:app_scanner/provider/auth/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Login extends StatelessWidget {
  
  Login({Key? key}) : super(key: key);
  final inputUser = TextEditingController();
  final inputPass = TextEditingController();

  @override
  Widget build(BuildContext context) {
    // Styles
    const textStyle = TextStyle( fontWeight: FontWeight.bold, color: primaryColor,fontSize: 35);
    // Provider
    final userProv = Provider.of<User>(context);

    return Scaffold(
        body: Container(
      padding: const EdgeInsets.all(10),
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text("Login",style: textStyle),
          const TextContainer(
            child: TextField(
              decoration: InputDecoration(
                  hintText: "email",
                  icon: Icon(Icons.email, color: primaryLightColor),
                  border: InputBorder.none),
            ),
            color: primaryColor,
          ),
          const TextContainer(
            child: TextField(
              decoration: InputDecoration(
                  hintText: "password",
                  icon: Icon(Icons.lock, color: primaryLightColor),
                  border: InputBorder.none),
            ),
            color: primaryColor,
          ),
          TextContainer(
            child: SizedBox(
              child: TextButton(
                  child: const Text("login",style: TextStyle(color: Colors.white)),
                      onPressed: () =>Navigator.pushReplacementNamed(context, "eventosPro")
                  ),
              width: double.infinity,
            ),
            color: selectColor,
          )
        ],
      ),
    ));
  }
}

class TextContainer extends StatelessWidget {
  final Widget child;
  final Color color;
  const TextContainer({Key? key, required this.child, required this.color})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 5),
      decoration:
          BoxDecoration(color: color, borderRadius: BorderRadius.circular(30)),
      child: child,
    );
  }
}
