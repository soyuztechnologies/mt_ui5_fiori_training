sap.ui.define(
            ['sap/ui/core/UIComponent'], 
            function(UIComponent){
                return UIComponent.extend('mt.fin.ap.ab.Component',{
                    metadata: {
                        manifest: "json"
                    },
                    init : function(){
                        //super->constructor()
                        //we will call the base class constructor
                        UIComponent.prototype.init.apply(this);

                        this.getRouter().initialize();
                    },
                    // createContent: function(){
                        
                    //     var oAppView = new sap.ui.view({
                    //         id: "idAppView",
                    //         viewName: "mt.fin.ap.ab.view.App",
                    //         type: "XML"
                    //     });

                    //     //From the root view object get the container object
                    //     var oAppCon = oAppView.byId("idAppCon");

                    //     //Create child view objects
                    //     var oView1 = new sap.ui.view({
                    //         id: "idView1",
                    //         viewName: "mt.fin.ap.ab.view.View1",
                    //         type: "XML"
                    //     });

                    //     var oView2 = new sap.ui.view({
                    //         id: "idView2",
                    //         viewName: "mt.fin.ap.ab.view.View2",
                    //         type: "XML"
                    //     });

                    //     ///adding these views inside app container 
                    //     ///App con is the mother here which willhelp to navigate
                    //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);

                    //     return oAppView;

                    // },
                    destroy: function(){

                    }
                });
});