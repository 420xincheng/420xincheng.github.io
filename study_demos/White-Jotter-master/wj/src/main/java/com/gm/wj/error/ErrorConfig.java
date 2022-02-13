package com.gm.wj.error;


import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/**
 * @author Evan
 * @date 2019/4
 */
@Component
public class ErrorConfig implements ErrorPageRegistrar {
    /**
     * 将错误页面默认设置为index.html
     * @param registry
     */
    @Override
    public void registerErrorPages(ErrorPageRegistry registry) {
        ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
        registry.addErrorPages(error404Page);
    }

}

