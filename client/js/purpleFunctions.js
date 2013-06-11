/** 
 *
 * JS client methods used by purple framework 
 *
**/
ko.Purple = new function() 
{
    var self = this;

    /**
     * Cast an object as an array
     * @param obj : the object to cast as array
     * @return the array
    **/
    self.objToArray = function(obj) {
        return $.map(obj, function(value,index) { return [value]; });
    }

    /**
     * Method used to make an ajax call and redirect to callback function
     * @param serviceUrl : the url of the json
     * @param  params : javascript object of the url params
     * @param  callbackFunction : the functon to call with the resulted data. 
     * This method should have one parameter who will be filled with returned data of the ajax call
     * @param  httpMethod : GET by default, but can be POST also
     * @param errorCallbackFunction : Method called if an error occurs
     * @author : eka808
    **/
    self.jsonCall = function(serviceUrl, params, callbackFunction, httpMethod, errorCallbackFunction)
        {
            httpMethod = typeof httpMethod !== 'undefined' ? httpMethod : 'GET';
            errorCallbackFunction = typeof httpMethod !== 'undefined' ? errorCallbackFunction : null;

            $.ajax({
                type:httpMethod
                ,url:serviceUrl
                ,async:true
                ,cache:false
                ,timeout:50000
                ,data:params
                ,success: 
                    function(jsonData) 
                    {
                        callbackFunction(jsonData);  
                    }
                ,error:
                    function(XMLHttpRequest, textStatus, errorThrown)
                    {
                        if (errorCallbackFunction != null)
                            errorCallbackFunction();
                    }
            });
        };
};