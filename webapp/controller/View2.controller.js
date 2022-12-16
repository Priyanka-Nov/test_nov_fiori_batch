sap.ui.define([
    'tcs/fin/payroll/controller/BaseController',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend("tcs.fin.payroll.controller.View2",{
        onInit: function(){
            //get the router object 
            this.oRouter = this.getOwnerComponent().getRouter();
            //use the router object to tell router ,i want to call 
            // whenver route change route can change because 
            //1 when i click an item on left 
            //2 when user press browser navigation btns
            //3 user can manually change route
            //hey Router ,whenever route change call a method herculis
            this.oRouter.getRoute("detail").attachMatched(this.herculis,this);
           // this.oRouter.attachRootMatched(this.herculis,this)
        },
        
        oSupplierPopup: null,
      
        onFilter: function(oEvent){
            debugger;
            var that = this;
            if(this.oSupplierPopup === null)
            {
            Fragment
            .load({
               id:"supplier",
               name:"tcs.fin.payroll.fragments.popup",
               controller:this
            })
            .then(function(oDialog){
               //in the call back function we cannot getting acces the this pointer 
               //As Controller object ,we need a local variable that where  we assign this
               //we can have the access of local variable inside the call back  
                  //debugger;

                  that.oSupplierPopup = oDialog;
                  //use the remote controller of the past for binding 
                  that.oSupplierPopup.setTitle("Supplier");
                  //allow access to model by view  immune system allowing parasite to access 
                 that.getView().addDependent(that.oSupplierPopup);
                  // Syntax no. 4 which learnt in past for aggregation binding
                 
                  that.oSupplierPopup.bindAggregation("items",{
                    path :'/suppliers',
                    template : new sap.m.DisplayListItem({
                        label : "{name}",
                        value : "{sinceWhen}"
                    })
                  });
                  that.oSupplierPopup.open();
            });
           }else{
               this.oSupplierPopup.open();  
           } 
        //  MessageBox.confirm("This functionality is also under construction,action starts next week:)");
        },
        onTest: function(){
             MessageBox.confirm("Parasite is working");
        },
        onItemPress: function(oEvent){
             
            var oSelectedItem =oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("supplier",{
                   supplierId : sIndex
            });
           // MessageBox.confirm("I confirm to Anubhav that i will implement the 3rd view"+"and navigate to the supplier details on weekend")
        },
        onConfirmPopup : function(oEvent){
            var sId = oEvent.getSource().getId();
            //Step 1 get the selected Item by user 
            if(sId.indexOf("city") !== -1)
            {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                // Step 2 get the value of the selected data 
                var sLabel = oSelectedItem.getLabel();
               // debugger;
                // Step 3 Set the value in the same fields INSIDE the label where F4 was pressed 
                this.oField.setValue(sLabel);
            }else{
                var aSelectedItem = oEvent.getParameter("selectedItems");
                var aFilter=[];
                for(let i = 0; i< aSelectedItem.length; i++)
                {
                    const element = aSelectedItem[i];
                    var sText = element.getLabel();
                    var oFilterCondition = new Filter("name",FilterOperator.EQ,sText); 
                    aFilter.push(oFilterCondition);
                }
                var oFilter = new Filter({
                    filters:aFilter,
                    and :false
                });
                  this.getView().byId("idTable").getBinding("items").filter(oFilter);
            }
           
        },
        cityPopup: null,
        oField :null,
        onF4Help: function(oEvent){
            this.oField = oEvent.getSource();
            //local 
            var that = this;
            if(this.cityPopup === null)
            {
                //load is the asyn in nature
            Fragment
            .load({
               id:"city",
               //completed Address
               name:"tcs.fin.payroll.fragments.popup",
               //instance of the controller 
               controller:this 
            })
            //promise call here .
            .then(function(oDialog)
           {
               //in the call back function we cannot getting acces the this pointer 
               //As Controller object ,we need a local variable that where  we assign this
               //we can have the access of local variable inside the call back  
                  //debugger;

                  that.cityPopup = oDialog;
                  //use the remote controller of the past for binding 
                 that.cityPopup.setTitle("Cities");
                  //allow access to model by view  -immune system allowing parasite to access (view host )
             
                  that.getView().addDependent(that.cityPopup);
                   // Syntax no. 4 which learnt in past for aggregation binding
                  that.cityPopup.setMultiSelect(false);
                //   that.cityPopup.bindItems({
                //     path :'/cities',
                //     template : new sap.m.DisplayListItem({
                //         label : "{name}",
                //         value : "{famousFor}"
                 //     })
                //  });
                  that.cityPopup.bindAggregation("items",{
                    path :'/cities',
                    template : new sap.m.DisplayListItem({
                        label : "{name}",
                        value : "{famousFor}"
                    })
                  });
                  that.cityPopup.open();
            });
           }else{
            // created a object once
               this.cityPopup.open();  
           }    
        //MessageBox.confirm("we clicked on"+sId+"this functionality is under construction,please check later");
   },
        herculis: function(oEvent){
            //now the route change
            //Step 1 what is fruit id selected by user 
           var sIndex = oEvent.getParameter("arguments").fruitId;
           //step 2 :construct the path for element binding 
           var sPath ='/fruits/' + sIndex;
           //step 3: perform the element binding with current view 
           this.getView().bindElement(sPath);  
        },
        onSupplierSelect: function(oEvent){
                var oSelectedItem =oEvent.getParameter("listItem");
                var sPath = oSelectedItem.getBindingContextPath();
                var sIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("supplier",{
                       supplierId : sIndex
                });
        },
        onSave:function(){
            MessageBox.confirm("Would like to save",{
                title : "confirmation",
                onClose : this.onCloseMsg
            });

        },
        onCloseMsg : function(status){
            if(status === "OK"){
                MessageToast.show("This sales order XXXX has been created successfully!");  
            }else{
                MessageBox.error("Action was cancelled");
            }
        },
        onBack:function(){
            this.getView().getParent().to("idView1");
        }  
    });
    
}); 