import { By, BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfRelationshipOptionsComponent } from './af-relationship-options.component';
import { RelationshipOptionsService } from './relationship-options.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';

describe('AfRelationshipOptionsComponent', () => {
    let component: AfRelationshipOptionsComponent;
    let fixture: ComponentFixture<AfRelationshipOptionsComponent>;
    const mockOptionsService = jasmine.createSpyObj('relationshipOptionsService', ['init', 'getPage']);

    const pageSize = 7;
    const displayNameField = 'name';
    const dummyListOpts = [
        { id: 1, name: 'Sigma' },
        { id: 2, name: 'Helena Chemical' },
        { id: 3, name: 'Sigma-Aldrich' },
        { id: 4, name: 'Parchem Fine & Specialty Chemicals' },
        { id: 5, name: 'Spectrum Chemical: Laboratory Fine Chemicals' },
        { id: 6, name: 'Seidler' },
        { id: 7, name: 'Aceto Corp.' },
        { id: 8, name: 'AerChem inc.' },
        { id: 9, name: 'Akrochem' },
        { id: 10, name: 'BioSpectra' },
        { id: 11, name: 'Charles Bowman and Co.' },
        { id: 12, name: 'ChemCeed' },
        { id: 13, name: 'Chemir' },
        { id: 14, name: 'ChemPacific Corporation' },
        { id: 15, name: 'Cole Chemical' },
        { id: 16, name: 'Colonial Chemical, Inc.' },
        { id: 17, name: 'Dudley Chemical Corp.' },
        { id: 18, name: 'EMD Millipore' },
        { id: 19, name: 'Frinton Laboratories, Inc.' },
        { id: 20, name: 'FMC Lithium' },
        { id: 21, name: 'Global Essence Inc.' },
        { id: 22, name: 'Hawkins, Inc.' },
        { id: 23, name: 'Jedwards International, Inc.' },
        { id: 24, name: 'Jeen International' },
        { id: 25, name: 'Kemira Water Solutions, Inc.' },
        { id: 26, name: 'Kingston Chemistry' },
        { id: 27, name: 'Lidochem, Inc.' },
        { id: 28, name: 'Matrix Scientific' },
        { id: 29, name: 'MilliporeSigma' },
        { id: 30, name: 'Patheon' },
    ];
    const dummyConfig = {
        pageSize: pageSize,
        allOptions: dummyListOpts
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserModule,
                FormsModule
            ],
            declarations: [AfRelationshipOptionsComponent],
            providers: [{ provide: RelationshipOptionsService, useValue: mockOptionsService }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockOptionsService.init.and.callFake(() => { });
        mockOptionsService.getPage.and.returnValue(Observable.create(o => o.next(dummyListOpts.slice(0, pageSize))));

        fixture = TestBed.createComponent(AfRelationshipOptionsComponent);
        component = fixture.componentInstance;
        component.displayNameField = displayNameField;
        component.relationshipServiceConfig = dummyConfig;
        fixture.detectChanges();
    });

    it('should load the first page of options on init', async(() => {
        fixture.whenStable().then(() => {
            const optionElements = fixture.debugElement.queryAll(By.css('.option'));
            expect(optionElements.length).toBe(pageSize);
        });
    }));

    it('entering text should reset the options based on the input', () => {
        fixture.whenStable().then(() => {
            spyOn(component, 'newSearch').and.callThrough();
            component.filterValue = 'New Filter Value';
            component.ngOnChanges({ filterValue: new SimpleChange(null, 'New Filter Value', true) });
            expect(component.newSearch).toHaveBeenCalled();
        });
    });

    it('entering a search term that returns one option should automatically select that option', () => {
        const singleOpt = dummyListOpts.slice(0, 1);
        mockOptionsService.getPage.and.returnValue(Observable.create(o => o.next(dummyListOpts.slice(0, 1))));
        spyOn(component.optionSelected, 'emit');
        fixture.whenStable().then(() => {
            component.filterValue = '';
            const inputElement = fixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.value = 'Sigma';
            inputElement.nativeElement.dispatchEvent(new Event('keyup'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.optionSelected.emit).toHaveBeenCalled();
            });
        });
    });
});
