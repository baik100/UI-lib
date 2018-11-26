$(document).ready(function() {


    /**
     *  UI 스크립트
     */

    uiExample.init();


});

var uiExample = {
    init:function () {
        uiExample.lodashEx();
        uiExample.searchEx();
        uiExample.popupMain();
    },

    //date select box
    lodashEx : function () {
        var years = _.range(2019, 1899);
        years.shift();
        years.unshift("foo");
        years.pop();
        years.push("last");

        var yearEl = _.map(years, function (year) {
            return `<option>` + year + `</option>`
        });

        $('.years').html(yearEl);

        var month = _.range(1, 13);
        var monthEl = _.map(month, function (month) {
            return `<option>` + month + `</option>`
        });

        $('.month').html(monthEl);

        var date = _.range(1, 32);
        var dateEl = _.map(date, function (date) {
            return `<option>` + date + `</option>`
        });

        $('.date').html(dateEl);

    },

    //map example
    searchEx : function () {
        axios.get('https://jsonplaceholder.typicode.com/users').then(function (res) {
            const users = res.data;

            $('.search').on('keyup', function () {
                const inputValue = $(this).val();
                let rusers = [];

                _.find(users, function (user) {
                    if(inputValue.length>0 && _.includes(users.username, inputValue )){
                        rusers.push(user);
                    }
                })
                const renderUserName = _.map(rusers, function (user) {
                    return "<p>" + ${rusers.username} + "</p>"
                })
                $('.drop').html(renderUserName);
                const renderCardName = _.map(rusers,function (user) {
                    return `<li>
                    <h3>${ruser.username}</h3>
                    <div class="email">${ruser.email}</div>
                    <div class="phone">${ruser.phone}</div>
                </li>`
                });
                $('.lists').html(renderCardName);
            })
        })
    },

    //today close
    popupMain : function () {
        var cookiesPopupMain = Cookies.get('popupMain');

        $('.btn_today_close').on('click', function () {
            if(_.isUndefined(cookiesPopupMain)){
                $('.popupMain').show();
            }
            $('.btn_today_close').on('click', function () {
                Cookies.set('popupMain', 'hidden', {expires: 1});
                $(this).closest('.btn_').hide();
            })
        })
    },

};


