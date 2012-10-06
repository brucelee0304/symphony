/*
 * Copyright (c) 2012, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview register.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.5, Sep 28, 2012
 */

/**
 * @description Register
 * @static
 */
var Register = {
    _validateData: [{
        "id": "userName",
        "msg": "用户名长度为1~20",
        "type": 20
    }, {
        "id": "userEmail",
        "msg": "邮件格式不正确",
        "type": "email"
    }, {
        "id": "userPassword",
        "msg": "密码长度为1~16",
        "type": "password"
    }, {
        "id": "confirmPassword",
        "msg": "密码输入不一致",
        "type": "confirmPassword"
    }, {
        "id": "securityCode",
        "msg": "验证码不能为空",
        "type": 4
    }],

    /**
     * @description 注册
     */
    register: function () {
        if (Validate.goValidate(this._validateData)) {
            var requestJSONObject = {
                userName: $("#userName").val().replace(/(^\s*)|(\s*$)/g,""),
                userEmail: $("#userEmail").val().replace(/(^\s*)|(\s*$)/g,""),
                userPassword: $("#userPassword").val(),
                captcha: $("#securityCode").val()
            };
            
            $.ajax({
                url: "/register",
                type: "POST",
                cache: false,
                data: JSON.stringify(requestJSONObject),
                success: function(result, textStatus){
                    if (result.sc) {
                        window.location = decodeURIComponent(location.search.split("=")[1]);
                    } else {
                        $("#registerTip").text(result.msg);
                    }
                },
                complete: function (jqXHR, textStatus){
                }
            });
        }
    },
    
    init: function () {
        // 注册回车事件
        $("#securityCode").keyup(function (event) {
            if (event.keyCode === 13) {
                Register.register();
            } 
        });
        
        // 表单错误状态
        $("input[type=text], input[type=password], textarea").blur(function () {
            $(this).removeClass("input-error");
        });
        
        // init validate
        Validate.initValidate(this._validateData);
    }
 
};