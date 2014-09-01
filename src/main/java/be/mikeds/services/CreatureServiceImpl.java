package be.mikeds.services;

import be.mikeds.model.Creature;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Singleton
public class CreatureServiceImpl implements CreatureService {
    private static final int TWENTY_SIDED = 20;

    private List<Creature> creatures = new ArrayList<>();

    @Inject
    private DiceRollerService diceRollerService;

    @Override
    public void addCreature(Creature creature) {
        creatures.add(creature);
    }

    @Override
    public void deleteCreature(String name) {
        Iterator<Creature> i = creatures.iterator();
        while (i.hasNext()) {
            Creature creature = i.next();
            if (creature.getName().equals(name)) {
                i.remove();
            }
        }
    }

    @Override
    public List<Creature> getCreatures() {
        return unmodifiableList(creatures);
    }

    @Override
    public List<Creature> calculateInitiative() {
        for (Creature creature : creatures) {
            if (creature.getCalculatedInitiative() == 0) {
                creature.setCalculatedInitiative(diceRollerService.roll(1, TWENTY_SIDED) + creature.getInitiative());
            }
        }

        sort(creatures, (c1, c2) -> c2.getCalculatedInitiative() - c1.getCalculatedInitiative());

        return creatures;
    }

    @Override
    public void resetCreatures() {
        creatures = new ArrayList<>();
    }

    @Override
    public void shiftCreaturesLeft() {
        if (creatures.size() > 1) {
            creatures.add(creatures.get(0));
            creatures.remove(0);
        }
    }

    @Override
    public Creature getCreature(String name) {
        for (Creature creature : creatures) {
            if(creature.getName().equals(name)) {
                return creature;
            }
        }

        return null;
    }


}
