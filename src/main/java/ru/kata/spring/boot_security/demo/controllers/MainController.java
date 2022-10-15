package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
public class MainController {

    @GetMapping(value = "/admin")
    public String get() {
        return "main_admin_js";
    }

    @GetMapping(value = "/user")
    public String getUser() {
        return "main_user_js";
    }

}
