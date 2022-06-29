

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"
import{HeroComponent} from '../hero/hero.component'
import { Hero } from "../hero";

describe('HeroesComponent (deep tests )',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    let component;
beforeEach(()=>{
    mockHeroService= jasmine.createSpyObj([
        'getHeroes',
        'addHero',
        'deleteHero'

    ])
    HEROES=[
        {id:2,name:'danish',strength:8},
        {id:1,name:'arqam',strength:20}
    ]
    TestBed.configureTestingModule({
        declarations:[HeroesComponent,
    HeroComponent
        ],
        providers:[{
            provide:HeroService,useValue:mockHeroService
        }],
        
    });
    fixture = TestBed.createComponent(HeroesComponent);
    
})
it('should set heroes',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(2)
})
it(`should call heroService.deleteHero
when Hero Component's delete button is clicked
`,()=>{
    spyOn(fixture.componentInstance,'delete')
mockHeroService.getHeroes.and.returnValue(of(HEROES));
fixture.detectChanges();

const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

heroComponentDEs[0].query(By.css('button'))
.triggerEventHandler('click',{stopPropagation:()=>{}});


 expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
 expect(fixture.componentInstance.heroes.length).toBe(2)

})



xit('should call add hero if name is defined',()=>{
    spyOn(fixture.componentInstance,'add');
   const name='danish';
   const strength = 11
   const id=12;


    mockHeroService.addHero.and.returnValue(of(true));
    fixture.componentInstance.heroes = HEROES;

    fixture.debugElement.query(By.css('button'))
    .triggerEventHandler('click','');
    mockHeroService.addHero({name,strength})

    expect(fixture.componentInstance.add).toHaveBeenCalledWith('')
    expect(mockHeroService.addHero).toHaveBeenCalledWith({name,strength})
    expect(fixture.componentInstance.heroes.length).toBe(2)



})

xit('should call add hero if name is not defined',()=>{
    spyOn(fixture.componentInstance,'add');
    
    const name=null;
    const strength = 11;
    const HERO={
       
        name:name,
        strength:strength
    }


    fixture.componentInstance.add(null)

    expect(fixture.componentInstance.add).toHaveBeenCalledWith(null)

    expect(mockHeroService.addHero).not.toHaveBeenCalledWith(HERO);
})

it('should call add method',()=>{
    spyOn(fixture.componentInstance,'add');
    fixture.componentInstance.add('danish')
    expect(fixture.componentInstance.add).toHaveBeenCalledWith('danish')
})
it('should add Hero when #add is called',()=>{
    const name='danish';
    const strength=11;

    const hero={
        id:12,
        name:'arqam',
        strength:20
    }
    
    mockHeroService.addHero.and.returnValue(of(hero));
    mockHeroService.getHeroes.and.returnValue(of(HEROES))

    fixture.detectChanges();

    fixture.componentInstance.add(name);
    
    expect(mockHeroService.addHero).toHaveBeenCalledWith({name,strength});


})

it('should not add Hero when #add is called and name is null',()=>{
    const name=null;
    const strength=11;

    const hero={
        id:12,
        name:'',
        strength:20
    }
    
    mockHeroService.addHero.and.returnValue(of(hero));
    mockHeroService.getHeroes.and.returnValue(of(HEROES))

    fixture.detectChanges();

    fixture.componentInstance.add('');
    
    expect(mockHeroService.addHero).not.toHaveBeenCalledWith({name,strength});


})



})