sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    // using the dependency to inherit from sap standard module
    return Controller.extend("donald.controller.Main", {
        // Event handler function which will trigger

        // It is used to initialize the code
        onInit: function() {
            // Step 1: Create a brand new object of the model
            var oModel = new sap.ui.model.json.JSONModel();
            // Step 2: Set or load the data in the model
            oModel.setData({
                "empStr": {
                    "empId": '1000',
                    "empName": "Ironman",
                    "salary": 95000,
                    "currency": "USD",
                    "smoker": true
                },
                "empTab": []
            });
            // Step 3: Make the model aware to the application / View / Control
            sap.ui.getCore().setModel(oModel);

            // Binding syntax
            //Syntax 3 for binding as property specific method
            this.getView().byId("idSal").bindValue('/empStr/salary');
            //Syntax 4 for binding using a generic method
            this.getView().byId("idCurr").bindProperty("value", "/empStr/currency");
            this.getView().byId("idSmoker").bindProperty("state", "/empStr/smoker");
        },
        clickMe: function() {
            // Step 1: Obtain the object of my app
            var oApp = sap.ui.getCore();
            // Step 2: From the 'App' object, get the control object of input field
            var oInp = oApp.byId('idMyInput');
            // Step 3: Call a UI5 function/method to get the value from the input field
            var sVal = oInp.getValue();
            
            // print the value in the alert popup
            alert(sVal);
        },
        runMycode: function() {
            // Step 1: Get the view object
            var oView = this.getView();
            // Step 2: Get the contrl object of new input field
            var oInput = oView.byId("idNewInput");
            // Step 3: Set the value in the new input field
            oInput.setValue('Maza aavigiyo!'); 
        },
        onChangeData: function() {
            // OLD APPROACH
            // var oView = this.getView()
            // var oInpEmpId = oView.byId("idEmpId");
            // oInpEmpId.setValue("0000123");

            // NEW APPROACH - Using Model
            // Step 1: get the model object from app because in onInit, we set model at app level
            var oModel = sap.ui.getCore().getModel();
            // Step 2: Change the data
            oModel.setProperty("/empStr", {
                "empId": "1000022",
                "empName": "Vanshika",
                "salary": 850000,
                "currency": "JPY",
                "smoker": false
            });
        }
    })
});