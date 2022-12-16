sap.ui.define([
     'sap/ui/core/UIComponent'
],function(UIComponent){
    'use strict';
    return UIComponent.extend("tcs.fin.payroll.Component",{
            metadata:{
                manifest:"json"
            },
            init: function(){
              //create the base class object 
              sap.ui.core.UIComponent.prototype.init.apply(this);
              //Step 1:get the router object
              var oRouter= this.getRouter();
              //Step 2: Inialize
              oRouter.initialize();
              

            },
            /*
            createContent:function(){
                //Step 1::Create App view object
                 var oView = new sap.ui.view({
                     id:"idAppView",
                     viewName:"tcs.fin.payroll.view.App",
                     type :sap.ui.core.mvc.ViewType.XML
                 });
                 //Step 2:: Get the app container control object from App view
                 var oAppCon = oView.byId("AppCon");

                 //Step 3 ::Add our View object inside app container control
                 var oView2 = new sap.ui.view({
                    id:"idView2",
                    viewName:"tcs.fin.payroll.view.View2",
                    type :sap.ui.core.mvc.ViewType.XML
                });
                var oView1 = new sap.ui.view({
                    id:"idView1",
                    viewName:"tcs.fin.payroll.view.View1",
                    type :sap.ui.core.mvc.ViewType.XML
                   
                });
                oAppCon.addMasterPage(oView1).addDetailPage(oView2);


                 return oView;
            },*/
            destroy:function(){

            }
    });
});


/*
sap.ui.define([],function(){
    'use strict';
    return 
});
 1 metadata : {
    manifest :"json" 
 }
2 init :function (){
    sap.ui.core.UIcomponent.prototype.init.apply.(this);
}
3
createcontent :function (){

},
4 
destroy :function (){
    
}

*/

