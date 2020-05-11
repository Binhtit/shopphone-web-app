function login() {
    console.log("run");
    console.log($("form").serialize());

    $.ajax({
        url: "/web/login",
        method: "POST",
        data: $("form").serialize(),
        success: result => {
            processData(result);
        },
        error: error => {
            console.log("error");
            alert('Xin loi');
        }
    });
}

function processData(result) {
    console.log(result);
    alert('ok');
};