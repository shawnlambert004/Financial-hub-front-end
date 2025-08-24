package com.shawn.financial_hub;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.shawn.financial_hub.*;

@Service
public class FeedService {
    @Autowired
    FeedRepo feedrepo;
    
    public void saveUrl (String url){
        feedrepo.save(url);
    }

    public void addUrl (String url){
        if (feedRepo.findByUrl(url) != null) {
            throw new RuntimeException("url already added")
        }
        else {
            saveUrl(url)
        }
    }
    
}