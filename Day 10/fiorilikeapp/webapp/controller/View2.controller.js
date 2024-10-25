    sap.ui.define([
        "mt/fin/ap/ab/controller/BaseController",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ], function(Controller,MessageBox,MessageToast,Fragment, Filter, FilterOperator) {
        'use strict';
        return Controller.extend("mt.fin.ap.ab.controller.View2", {
            onInit: function(){
                var oRouter = this.getOwnerComponent().getRouter();
                //We attach a function which gets called everytime the route changes
                //When does the route change ??
                //When user click the list itemn
                //When user click back and forward on browser
                //When user open the app in new link
                //User can change the route manually also
                oRouter.getRoute("detail").attachMatched(this.herculis, this);
            },
            onSave: function(){
                MessageBox.confirm("Do you want to Save",{
                    onClose: function(status){
                        if(status === "OK"){
                            MessageToast.show("Your preference was saved 😊");
                        }else{
                            MessageBox.error("Ola! you broke my heart 💔");
                        }
                    }
                });
            },

            //in abap - if lo_alv is not bound
            oSupplierPopup: null,
            onFilter:function(){
                var that = this;
                if(!that.oSupplierPopup){
                    Fragment.load({
                        name: 'mt.fin.ap.ab.fragments.popup',
                        id: 'supplier',
                        controller: this
                    }).then(
                        //here in callback we cannot acces this pointer as controller object
                        //the only way to access controller object is to create a copy of it outside
                    function(oDialog){
                        that.oSupplierPopup = oDialog;   
                        that.oSupplierPopup.setTitle("Choose Supplier");
                        that.getView().addDependent(that.oSupplierPopup);
                        that.oSupplierPopup.bindAggregation("items",{
                            path: '/suppliers',
                            template: new sap.m.StandardListItem({
                                icon: 'sap-icon://supplier',
                                title: '{name}',
                                description: '{city}'
                            })
                        });   
                        that.oSupplierPopup.open();    
                    });
                }else{
                    that.oSupplierPopup.open();
                }
            },
            onConfirm: function(oEvent){
                var sId = oEvent.getSource().getId();
                if(sId.indexOf("city") !== -1){
                    //Step 1: get selected item
                    var oSelItem = oEvent.getParameter("selectedItem")
                    //Step 2: get the value
                    var sVal = oSelItem.getTitle();
                    //Step 3: Set the data to field on which f4 was done
                    this.oField.setValue(sVal);
                }else{
                    //Exercise:
                    //when user choose the supplier, filter the supplier in table
                    //Step 1: get the array of all the multi - select items
                    var aItems = oEvent.getParameter("selectedItems");
                    var aFilter = [];
                    //Loop at each item and make a filter array of objects
                    for (let i = 0; i < aItems.length; i++) {
                        const element = aItems[i];
                        var sTitle = element.getTitle();
                        aFilter.push(new Filter("name", FilterOperator.EQ, sTitle));
                    }
                    //Get the table object
                    var oTable = this.getView().byId("suppTab");
                    //Inject the filter in binding
                    oTable.getBinding("items").filter(aFilter);

                }
                
            },
            oCityPopup: null,
            oField: null,
            onF4Help: function(oEvent){
                this.oField = oEvent.getSource();
                var that = this;
                if(!that.oCityPopup){
                    Fragment.load({
                        name: 'mt.fin.ap.ab.fragments.popup',
                        id: 'city',
                        controller: this
                    }).then(
                        //here in callback we cannot acces this pointer as controller object
                        //the only way to access controller object is to create a copy of it outside
                    function(oDialog){
                        that.oCityPopup = oDialog;   
                        that.oCityPopup.setMultiSelect(false);
                        that.oCityPopup.setTitle("Choose Supplier");
                        that.getView().addDependent(that.oCityPopup);
                        that.oCityPopup.bindAggregation("items",{
                            path: '/cities',
                            template: new sap.m.StandardListItem({
                                icon: 'sap-icon://supplier',
                                title: '{name}',
                                description: '{famousFor}'
                            })
                        });   
                        that.oCityPopup.open();    
                    });
                }else{
                    that.oCityPopup.open();
                }
            },
            herculis: function(oEvent){
                debugger;
                var sIndex = oEvent.getParameter("arguments").fruitPath;
                var sPath = '/fruits/' + sIndex;     //this is our element path for the selected fruit
                this.getView().bindElement(sPath);

                //TODO; Select the item in the list
                //Binding so the data can show on right side
            },
            onBack: function(){
                this.getView().getParent().to("idView1");
            }
        })
        
    });