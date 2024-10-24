sap.ui.define([
    "mt/fin/ap/ab/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "mt/fin/ap/ab/util/formatter"
], function(Controller, Filter, FilterOperator, Formatter) {
    'use strict';
    return Controller.extend("mt.fin.ap.ab.controller.View1", {
        formatter : Formatter,
        onNext: function(sFruitPath){
            //Step 1: get the mother object - app container
            //var oAppCon = this.getView().getParent();
            //Step 2: Navigate to next view
            //oAppCon.to("idView2");

            ///use router for app nav now
            var oRouter = this.getOwnerComponent().getRouter();
            ///please navifate for us to detail  /fruits/2
            //Exercise: debug and come back why we put 2??
            var sIndex = sFruitPath.split("/")[2];
            oRouter.navTo("detail",{
                fruitPath: sIndex
            });
        },
        onDeleteData: function(oAnubhav){
             var oList = this.getView().byId("idList");
             //get the event parameter from SDK which item to be deleted
             var aItemsToBeDeleted = oList.getSelectedItems();
             for (let i = 0; i < aItemsToBeDeleted.length; i++) {
                const element = aItemsToBeDeleted[i];
                //Remove the item which was suppose to be from list
                oList.removeItem(element);
              }
            
        },
        onItemSelect: function(oEvent){
            //Step 1: get the object of selected item
            var oSelect = oEvent.getParameter("listItem");
            //Step 2: get the element path
            var sPath = oSelect.getBindingContextPath();
            //      ==> /fruit/index    ==> lv_text 
            //      extract the index from the path
            //      SPLIT lv_text BY '/' INTO itab. 
            //      READ TABLE itab into lv_str index 2.
            // lv_text.split("/")[2]      ARR = ['',fruit,index]


            //Step 3: get the view2 object
            //var oView2 = this.getView().getParent().getParent().getDetailPages()[0];
            //Step 4: bind the view 2 with the element
            //oView2.bindElement(sPath);
            //Trigger navigation
            this.onNext(sPath);
        },
        onSearch: function(oEvent){
            //check the event documentation for search, there is a query parameter
            var sQuery = oEvent.getParameter("query");
            //construct a model filter object - operand OPERATOR operand 
            var oFilter1 = new Filter("name", FilterOperator.Contains, sQuery);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sQuery);

            //if( name operator op2 ) OR ( type operator op2 )

            var oFilter = new Filter({
                filters : [oFilter1, oFilter2],
                and: false
            });
            var aFilter = [oFilter];
            //Pass the filter object on our items aggregation
            var oAgg = this.getView().byId("idList").getBinding("items");
            //Inject our filter to the binding
            oAgg.filter(aFilter);
        }
    });
    
});