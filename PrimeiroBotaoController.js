({
    doInit : function(component, event, helper) {
        console.log(component.get('v.recordId'));     
        
    },        
    cancelar : function (component, event, helper){
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    },
    
    buscarCEP : function (component, event, helper){
      
        var action = component.get("c.consultaCep");
        action.setParams({ 
            cepDigitado : component.get("v.CEP") 
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {               
                console.log(response.getReturnValue());
                component.set("v.retornoViaCEP", response.getReturnValue());
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "consulta realizada com sucesso",   
                    "type":"success"
                });
                toastEvent.fire();
            }else {
                console.log("erro");
            }
        });                
        $A.enqueueAction(action);
    },
    
    
     salvarEndereco : function (component, event, helper){
      
        var action = component.get("c.atualizaEndereco");
        action.setParams({ 
            idConta : component.get("v.recordId"),
            jsonViaCep : JSON.stringify(component.get("v.retornoViaCEP"))
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {               
                console.log(response.getReturnValue());
                if(response.getReturnValue()){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Atualizado com sucesso",   
                        "type":"success"
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
                    var dismissActionPanel = $A.get("e.force:closeQuickAction");
                    dismissActionPanel.fire();
                    
                }else{
                    console.log("erro");
                }
                
            }else {
                console.log("erro");
            }
        });                
        $A.enqueueAction(action);
    },
})