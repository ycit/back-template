$(function () {
    var table;
    var columns = [{
        "data": "username",
        "orderable": true
    }, {
        "data": "fullName",
        "orderable": false
    }, {
        "data": "nickname",
        "orderable": false
    }, {
        "data": "sex",
        "orderable": false,
        "render":function (sex) {
            if (sex === 0) {
                return "女";
            } else if(sex === 1) {
                return "男";
            } else {
                return "未知";
            }
        }
    }, {
        "data": "dept",
        "orderable": false,
        "render":function (dept) {
            return dept.fullName;
        }
    }, {
        "data": "job",
        "orderable": false,
        "render":function (job) {
            return job.fullName;
        }
    }, {
        "data": "email",
        "orderable": false
    }, {
        "data": "tel",
        "orderable": false
    }, {
        "data": "createTime",
        "orderable": false,
        "render":function (createTime) {
            return moment(createTime).format("YYYY-M-D HH:mm:ss");
        }
    }, {
        "data": null,
        "orderable": false,
        "render":function (data, type, row, meta) {
            if (row.id !== 1) {
                return "<a class='edit-action' title='编辑' data-id='" + row.id +"'><i class=\"fa fa-x fa-pencil\"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "<a class='delete-action' title='删除' data-id='" + row.id +"'><i class=\"fa fa-x fa-trash-o\"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            } else {
                return "<a class='edit-action' title='编辑' data-id='" + row.id +"'><i class=\"fa fa-x fa-pencil\"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }

        }
    }];
    // 请求 用户数据
    utils.myAjax.get("/back/users",{},function (data) {
        table = $("#user-table").DataTable({
            data:data,
            columns:columns,
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }
        });
    });

    // 删除 行事件
    var deleteClick = $("#user-table tbody").on("click", "a.delete-action", function () {
        var that = this;
        var sure = utils.modal.myConfirm("提示", "确认删除该行数据吗", function (sure) {
            if (sure) {
                var id = $(that).data("id");
                $(that).parents('tr').attr('id', id); // 设置 row id
                utils.myAjax.post('/back/users/delete',{id:id}, function (data) {
                    if (data > 0) {
                        table.row('#' + id).remove().draw(false); // 前端移除 row
                    }
                })
            }
        });
    });

    var editClick =  $("#user-table tbody").on("click", "a.edit-action", function () {
        var id = $(this).data("id");
        window.location.href = "/back/users/edit/home?id=" + id;
    });


    utils.quick.click({
        //充值提交
        recharge: function () {
            var pass = $("#inpour-form").valid();
            if (!pass) {
                return;
            }
            var id = $("#user-id").val();
            var num = $("#user-num").val();
            utils.myAjax.post("/back/users/inpour", {id: id, num: num}, function (data) {
                $("#" + id).html(data);
                $("#inpour-modal").modal("hide");
                console.log(data);
            })
        }
    });
    $("#inpour-form").validate({
        rules:{
            num:{
                required:true,
                positiveInteger:true,
                between:true
            }
        },
        message:{
            num:{
                required:"充值金额不能为空"
            }
        }
    });
})