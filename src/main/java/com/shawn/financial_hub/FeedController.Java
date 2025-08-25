package com.shawn.financial_hub;
import com.shawn.financial_hub.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/beta/user")
@CrossOrigin
public class FeedController {
    @Autowired
    FeedService feedService;
    User user;

    @PostMapping("/addUrl")
    public void addUrl(String url, User user){
        feedService.addUrl(user, url);
    }

    @PostMapping("/delUrl") 
    public void delUrl(String url) {
        feedService.deleteUrl(url);
    }
}
