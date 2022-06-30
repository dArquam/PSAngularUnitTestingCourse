

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
xit('should set heroes (correct)',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(2)
})
it(`should call heroService.deleteHero
when Hero Component's delete button is clicked (correct)
`,()=>{
    spyOn(fixture.componentInstance,'delete')
mockHeroService.getHeroes.and.returnValue(of(HEROES));
fixture.detectChanges();

const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

// first approach:
// heroComponentDEs[0].query(By.css('button'))
// .triggerEventHandler('click',{stopPropagation:()=>{}});

// second approach:
// (<HeroComponent>heroComponentDEs[0].componentInstance).delete.next();

//third approach
heroComponentDEs[0].triggerEventHandler('delete',null);


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

xit('should call add method (correct)',()=>{
    spyOn(fixture.componentInstance,'add');
    fixture.componentInstance.add('danish')
    expect(fixture.componentInstance.add).toHaveBeenCalledWith('danish')
})
xit('should add Hero when #add is called (correct)',()=>{
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

xit('should not add Hero when #add is called and name is null (correct)',()=>{
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

// start revision
it('should add Heroes on the call of #getHeroes',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()
    expect(fixture.componentInstance.heroes.length).toBe(2)
})
it('should call #add',()=>{
    spyOn(fixture.componentInstance,'add');

    fixture.componentInstance.add('danish');

    expect(fixture.componentInstance.add).toHaveBeenCalledWith('danish')
})
it('should add Hero when #add is called',()=>{
    // const name="danish";
    const strength=11;
    const hero={
        id:23,
        name:'danish',
        strength:20
    }
    fixture.componentInstance.heroes=[]
    mockHeroService.addHero.and.returnValue(of(hero));
    
    fixture.componentInstance.add('danish')

    expect(fixture.componentInstance.heroes.length).toBe(1)
})
it('should call heroService.addHero when #add is called',()=>{
     const name="danish";
    const strength=11;
    const hero={
        id:23,
        name:'danish',
        strength:20
    }
    fixture.componentInstance.heroes=[]
    mockHeroService.addHero.and.returnValue(of(hero));
    
    fixture.componentInstance.add('danish')

    expect(mockHeroService.addHero).toHaveBeenCalledWith({name,strength})
})
it('should not call heroService.addHero when #add is called with empty string',()=>{
    const name="";
   const strength=11;
   const hero={
       id:23,
       name:'danish',
       strength:20
   }
   fixture.componentInstance.heroes=[]
   mockHeroService.addHero.and.returnValue(of(hero));
   
   fixture.componentInstance.add('')

   expect(mockHeroService.addHero).not.toHaveBeenCalledWith({name,strength})
})
it('should call #delete',()=>{
    spyOn(fixture.componentInstance,'delete') 
    const hero={
        id:1,
        name:'danish',
        strength:20
    }
    fixture.componentInstance.delete(hero);
    expect(fixture.componentInstance.delete).toHaveBeenCalled()
})
it('should remove hero when #delete is called',()=>{
    fixture.componentInstance.heroes=HEROES;
    mockHeroService.deleteHero.and.returnValue(of(HEROES[0]));

    fixture.componentInstance.delete(HEROES[0]);
    
    
    expect(fixture.componentInstance.heroes.length).toBe(1)
})

//revision end

})