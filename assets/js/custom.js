/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//  Top Nav Icon Toggle
$(function () {
    $(".sidebar-toggle").click(function () {
        $("div.body-wrapper").toggleClass('sidebar-close');
    });
});

$(document).ready(function () {
    $('.sidebar-menu li.active a.toggle').next('.treeview-menu').slideDown();
    $('.sidebar-menu li a.toggle').on('click', function () {
        if ($(this).parent("li").hasClass('active')) {
            $(this).parent("li").removeClass('active');
            $(this).next('.treeview-menu').slideUp();
        } else {
            $(".sidebar-menu li").removeClass("active").find(".treeview-menu").slideUp();
            $(this).parent("li").addClass('active');
            $(this).next('.treeview-menu').slideDown();
        }
    });
});



