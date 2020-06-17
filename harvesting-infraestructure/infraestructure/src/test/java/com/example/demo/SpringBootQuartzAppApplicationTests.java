package com.example.demo;

import static org.junit.Assert.assertTrue;

import com.backend.demo.SpringBootQuartzAppApplication;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringBootQuartzAppApplication.class)
public class SpringBootQuartzAppApplicationTests {

	@Test
	public void contextLoads() {
		assertTrue(true);
	}

}