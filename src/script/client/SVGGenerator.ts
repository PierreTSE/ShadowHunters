import * as crelLib from "crel";
import {Location} from "../common/Game/CharacterState";
import {breakText} from "./stringUtil";
import {outlineFilter} from "./SVGFilter";
import {Character, Faction} from "../common/Game/Character";

const crel = crelLib.proxy;
crelLib.attrMap['style'] = (element, value) => {
    for (const property in value) {
        if(value.hasOwnProperty(property)) {
            element.style[property] = value[property];
        }
    }
};

const crelns: any = function(namespace, type) {
    const element = document.createElementNS(namespace, type);
    return crelLib.apply(null, [element].concat(Array.prototype.slice.call(arguments, 2)));
};

const crsvg = new Proxy(crelns, {
    get: (target, p) =>  {
        !(p in crelns) && (crelns[p] = crelns.bind(null, 'http://www.w3.org/2000/svg', p));
        return crelns[p];
    }
});

export class SVGGenerator {

    private static locationNameToImageUrl(locationName: string) {
        switch (locationName) {
            case 'Forêt hantée':
                return 'img/locations/foret_hantee.jpg';
            case 'Porte de l\'outremonde':
                return 'img/locations/porte_outremonde.jpg';
            case 'Monastère':
                return 'img/locations/monastere.jpg';
            case 'Antre de l\'ermite':
                return 'img/locations/antre_de_lermite.jpg';
            case 'Cimetière':
                return 'img/locations/cimetiere.jpg';
            case 'Sanctuaire ancien':
                return 'img/locations/sanctuaire_ancien.jpg';
            default:
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wodDwIAja1x0AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII='
        }
    }

    static locationCard(location: Location) {
        return crsvg.svg({
                xmlns: "http://www.w3.org/2000/svg",
                'class': 'card-image',
                // width: 784,
                // height: 1076,
                viewBox: '0 0 784 1076'
            },
            crsvg.image({
                width: '100%',
                height: '100%',
                preserveAspectRatio: 'none',
                href: SVGGenerator.locationNameToImageUrl(location.name)
            }),
            location.numbers.length === 1 ?
                crsvg.text({
                    'font-size': 150,
                    x: '50%',
                    y: 700,
                    'text-anchor': 'middle',
                    fill: '#efe50a',
                    style: {
                        filter: `url(#blackspots)`
                    },
                    'class': 'numbers'
                }, location.numbers[0])
            :
            [
                crsvg.text({
                    'font-size': 140,
                    x: 290,
                    y: 705,
                    'text-anchor': 'middle',
                    fill: '#efe50a',
                    style: {
                        filter: `url(#blackspots)`
                    },
                    'class': 'numbers'
                }, location.numbers[0]),
                crsvg.text({
                    'font-size': 140,
                    x: 784-290,
                    y: 705,
                    'text-anchor': 'middle',
                    fill: '#efe50a',
                    style: {
                        filter: `url(#blackspots)`
                    },
                    'class': 'numbers'
                }, location.numbers[1])
            ],
            crsvg.text({
                'font-size': 60,
                x: '50%',
                y: 820,
                'text-anchor': 'middle',
                fill: '#efe50a',
                style: {
                    'font-weight': 'bold',
                    filter: `url(#location-name)`
                },
                'class': 'card-title'
            }, location.name),
            breakText(location.description, 120).map((line, index) => {
                return crsvg.text({
                    x: '50%',
                    y: 888 + 48*index,
                    'text-anchor': 'middle',
                    style: {
                        fill: '#ececec',
                        'font-size': '40px',
                        filter: `url(#${outlineFilter('#000000', 2)})`
                    }
                }, line);
            })
        );
    }

    private static characterNameToImageUrl(name: string) {
        switch (name) {
            case 'Franklin':
                return 'img/characters/franklin.png';
            case 'Emi':
                return 'img/characters/emi.png';
            case 'Georges':
                return 'img/characters/georges.png';
            case 'Vampire':
                return 'img/characters/vampire.png';
            case 'Loup-garou':
                return 'img/characters/loup-garou.png';
            case 'Métamorphe':
                return 'img/characters/metamorph.png';
            case 'Allie':
                return 'img/characters/allie.png';
            case 'Bob':
                return 'img/characters/bob.png';
            case 'Charles':
                return 'img/characters/charles.png';
            case 'Daniel':
                return 'img/characters/daniel.png';
            default:
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wodDwIAja1x0AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';
        }
    }

    static characterCard(character: Character) {
        if(character === null)
            return SVGGenerator.characterBack();
        const victoryConditionLines = breakText(character.victoryCondition.description, 200);
        const powerLines = breakText(character.power.description, 200);
        return crsvg.svg({
                xmlns: "http://www.w3.org/2000/svg",
                'class': 'card-image',
                // width: 784,
                // height: 1076,
                viewBox: '0 0 784 1076'
            },
            crsvg.image({
                width: '100%',
                height: '100%',
                preserveAspectRatio: 'none',
                href: SVGGenerator.characterNameToImageUrl(character.name)
            }),
            crsvg.text({
                'font-size': 120,
                x: 130,
                y: 165,
                'text-anchor': 'middle',
                fill: 'black',
                style: {
                    filter: `url(#${outlineFilter('#D0D0D0', 3)})`
                },
                'class': 'character-name'
            }, character.name.substr(0, 1).toUpperCase()),
            crsvg.text({
                'font-size': 60,
                x: 220,
                y: 85,
                fill: 'black',
                style: {
                    filter: `url(#${outlineFilter('#D0D0D0', 1)})`
                },
                'class': 'character-name'
            }, character.name.substr(1).toLowerCase()),
            crsvg.text({
                'font-size': 60,
                x: 110,
                y: 660,
                fill: 'black',
                style: {
                    filter: `url(#${outlineFilter('#D0D0D0', 1)})`
                }
            }, character.faction === Faction.Neutral ? 'Neutre' : character.faction === Faction.Hunter ? 'Hunter' : 'Shadow'),
            crsvg.text({
                'font-size': 60,
                x: 550,
                y: 660,
                fill: 'black',
                style: {
                    filter: `url(#${outlineFilter('#D0D0D0', 1)})`,
                    'font-family': 'Times New Roman'
                }
            }, 'PV'),
            crsvg.text({
                'font-size': 70,
                x: 695,
                y: 660,
                fill: 'black',
                'text-anchor': 'middle',
                style: {
                    filter: `url(#${outlineFilter('#D0D0D0', 1)})`,
                    'font-family': 'Times New Roman'
                }
            }, character.hp),
            crsvg.text({
                'font-size': 35,
                x: 110,
                y: 738,
                fill: '#D0D0D0',
            }, 'Condition de Victoire :'),
            victoryConditionLines.map((s, index) => crsvg.text({
                'font-size': 30,
                x: 120,
                y: 773 + 30*index,
                fill: '#D0D0D0',
            }, s)),
            crsvg.text({
                'font-size': 35,
                x: 110,
                y: 783 + 30*victoryConditionLines.length,
                fill: '#D0D0D0',
            }, 'Pouvoir : ' + character.power.name),
            powerLines.map((s, index) => crsvg.text({
                'font-size': 30,
                x: 120,
                y: 778 + 30*victoryConditionLines.length + 35 + 30*index,
                fill: '#D0D0D0',
            }, s)),
        );
    }

    static characterBack() {
        return crsvg.svg({
                xmlns: "http://www.w3.org/2000/svg",
                'class': 'card-image',
                // width: 784,
                // height: 1076,
                viewBox: '0 0 784 1076'
            },
            crsvg.image({
                width: '100%',
                height: '100%',
                preserveAspectRatio: 'none',
                href: 'img/characters/character back.png'
            })
        );
    }
}
