import 'package:flutter/material.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

class ScannerScreen extends StatelessWidget{
  const ScannerScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( 
        title: Text("Escanear"),
      ),
      drawer:  Drawer (
        child : ListView(
          children: [
            DrawerHeader(
              child:  Text('Head Drawer'),
            ),
            ListTile(
              title:  Text('Item 1'),
            ),
            ListTile(   
              title:  Text('Item 2'),
            )
          ],
        )
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton:  FloatingActionButton(
          
          child:  Icon(Icons.filter_center_focus),
          onPressed: () async{
            String codeScanner = await FlutterBarcodeScanner.scanBarcode('#3D8BEF', ' Cancelar', false, ScanMode.QR);
        }),
      
    );
  }
}


