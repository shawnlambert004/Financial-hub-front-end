package com.shawn.financial_hub;

import com.shawn.financial_hub.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/beta/feed")
@CrossOrigin
public class FeedController {
    @Autowired
    FeedRepo feedRepo;

    @Autowired
    FeedService feedService;
    @Autowired
    UserRepo userRepo;

    @PostMapping("/addUrl")
    public void addUrl(@RequestParam String url, @RequestParam Long userId) {
        Optional<User> userPossible = userRepo.findById(userId);
        if (userPossible.isEmpty()) {
            throw new RuntimeException("No User associated with URL");
        }
        User user = userPossible.get();
        feedService.addUrl(url, user);
    }

    @PostMapping("/delUrl")
    public void delUrl(@RequestParam String url) {
        feedService.deleteUrl(url);
    }
}
