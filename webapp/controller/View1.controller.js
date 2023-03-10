 sap.ui.define([
    'tcs/fin/payroll/controller/BaseController',
    'tcs/fin/payroll/util/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',

], function(BaseController,formatter,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend("tcs.fin.payroll.controller.View1",{
        formatter:formatter,
        onInit: function(){
             this.oRouter = this.getOwnerComponent().getRouter();
         
        },
       onDeleteItem: function(){
           //Step 1:Get the list control object 
           var oList = this.getView().byId("idList");
           // Step 2 Get each item object which was selected by the user 
           var aSelItems = oList.getSelectedItems();
           // Step 3 :Loop over and the deleted them one by one 
           for(let i=0;i<aSelItems.length;i++)
             {
              const oItem = aSelItems[i];
              oList.removeItem(oItem);
             }
       },
       onSelectItem : function(oEvent){
            //Step 1: get the object of selected item 
            var oSelectedItem = oEvent.getParameter("listItem");
           // debugger;
            //Step 2: Get the path of the element of this item 
            var sPath = oSelectedItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1]
            //debugger;
            //Step 3 : get the view 2 object
          /*  var oSplitApp = this.getView().getParent().getParent();
            var oView2 = oSplitApp.getDetailPages()[0]; 
            //Step 4 : Bind the view2 with element
            oView2.bindElement(sPath);*/
           this.onNext(sIndex);
       },
       onDelete: function(oEvent){
        //Step 1 Get the object of the selected by the user
        var oItemToBeDeleted = oEvent.getParameter("listItem");
        //Step 2 Get the list control object 
        var oList = oEvent.getSource();;

        //Step 3 use the list object to remove the items
        oList.removeItem(oItemToBeDeleted); 
       },
        onSearch: function(oEvent){
               //Step 1 Need the value entered by the user on search
               var query = oEvent.getParameter("query");
                //step 2contruct a filter condition 
                //two operand one operator if else
                var oFilter1 = new sap.ui.model.Filter("name",FilterOperator.Contains,query);
                var oFilter2 = new sap.ui.model.Filter("type",FilterOperator.Contains,query);
                var oFilter = new Filter({
                    filters:[oFilter1,oFilter2],
                    and: false
                });
                //step 3 :Inject this filter inside the list to filter to filter items 
                this.getView().byId("idList").getBinding("items").filter(oFilter);
        },
        onNext: function(sIndex){
            //Step 1:Get the app container control object 
            //getparent method call parent
           // var oAppCon = this.getView().getParent();
            //Step 2:From the parent App Con, navigate to view2
           //oAppCon.to("idView2");
          //Router to trigger the deatil route calling the router
           this.oRouter.navTo("detail",{
            fruitId : sIndex
         });
         }
    });
    
});
