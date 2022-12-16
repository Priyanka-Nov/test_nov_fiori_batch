sap.ui.define([
    'tcs/fin/payroll/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("tcs.fin.payroll.controller.Supplier",{
        onInit: function(){
            //get the router object 
            this.oRouter = this.getOwnerComponent().getRouter();
            //use the router object to tell router ,i want to call 
            // whenver route change route can change because 
            //1 when i click an item on left 
            //2 when user press browser navigation btns
            //3 user can manually change route
            //hey Router ,whenever route change call a method herculis
            this.oRouter.getRoute("supplier").attachMatched(this.herculis,this);
           // this.oRouter.attachRootMatched(this.herculis,this)
        },
        herculis: function(oEvent){
            //now the route change
            //Step 1 what is fruit id selected by user 
           var sIndex = oEvent.getParameter("arguments").supplierId;
           //step 2 :construct the path for element binding 
           var sPath ='/suppliers/' + sIndex;
           //step 3: perform the element binding with current view 
           this.getView().bindElement(sPath);  
        }
    });
    
}); 