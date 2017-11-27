var randbtn = document.querySelector("#randbtn");
var searchbtn = document.querySelector("#searchbtn");
var search_box = document.querySelector("#query");
var result_box = document.querySelector("#resultelem");
var q;
searchbtn.addEventListener("click", getResults);
randbtn.addEventListener("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
});

function getResults(e) {
    result_box.classList.remove('slide');
    result_box.textContent="";
    q = search_box.value;
    var request = new XMLHttpRequest();
    request.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&generator=search&formatversion=2&piprop=thumbnail&pithumbsize=50&pilimit=10&exchars=150&exlimit=10&exintro=1&explaintext=1&gsrsearch="+q+"&gsrlimit=10&gsrprop=snippet" , true);
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        var query_result = data.query.pages;
        for(var el of query_result) {
           result_box.insertAdjacentHTML("beforeend", "<a href=http://en.wikipedia.org/?curid=" + el.pageid + " target='_blank'><div><p class='search-title'>" + el.title + "</p><p class='snippet'>"+el.extract+"</p></div></a>")
        }
        result_box.classList.add('slide');
    }
    request.send();
    e.preventDefault();
}
