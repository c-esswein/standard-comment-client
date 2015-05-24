
define('utils', [], function() {
    return {
        getFormData: function(form) {
            var arr = form.serializeArray();
            var data = {};

            for (var i = 0; i < arr.length; i++) {
              data[arr[i].name] = arr[i].value;
            }

            return data;
        }
    };
});
