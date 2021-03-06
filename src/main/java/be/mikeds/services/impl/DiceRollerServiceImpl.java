package be.mikeds.services.impl;

import be.mikeds.services.DiceRollerService;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Random;

/**
 * --------------------------------
 * Created by mikeds on 18/08/2014.
 * --------------------------------
 */
@Service
public class DiceRollerServiceImpl implements DiceRollerService {

    @Override
    public int roll(int numberOfDice, int numberOfSides) {
        int num = 0;
        int roll;
        Random r = new Random();
        if(numberOfSides >=3) {
            for(int i = 0; i < numberOfDice; i++) {
                roll = r.nextInt(numberOfSides)+1;
                num = num + roll;
            }
        }

        return num;
    }
}
