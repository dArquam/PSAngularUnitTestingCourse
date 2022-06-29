import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent',()=>{
    let component:HeroesComponent;
    let mockHeroService;
    let Heroes;

    beforeEach(()=>{
        Heroes=[
            {id:2,name:'danish',strength:8}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])


        component= new HeroesComponent(mockHeroService);  

    })

    describe('delete',()=>{
        it('should delete Heroes when #delete is called',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = Heroes;

            component.delete(Heroes[0]);

            expect(component.heroes.length).toBe(0)
        })
        it('should call deleteHero',()=>{
            component.heroes = Heroes;
            mockHeroService.deleteHero.and.returnValue(of(true))
            
            component.delete(Heroes[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(Heroes[2])
        })
    })
})