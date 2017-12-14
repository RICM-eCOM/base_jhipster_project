import { BaseEntity } from './../../shared';

export const enum CourseType {
    'MARATHON',
    'SKI'
}

export const enum CourseDept {
    '(01) - Ain',
    '(02) - Aisne',
    '(03) - Allier',
    '(04) - Alpes-de-Haute-Provence',
    '(05) - Hautes-alpes',
    '(06) - Alpes-maritimes',
    '(07) - Ardèche',
    '(08) - Ardennes',
    '(09) - Ariège',
    '(10) - Aube',
    '(11) - Aude',
    '(12) - Aveyron',
    '(13) - Bouches-du-Rhône',
    '(14) - Calvados',
    '(15) - Cantal',
    '(16) - Charente',
    '(17) - Charente-maritime',
    '(18) - Cher',
    '(19) - Corrèze',
    '(2a) - Corse-du-sud',
    '(2b) - Haute-Corse',
    '(21) - Côte-d\'Or',
    '(22) - Côtes-d\'Armor',
    '(23) - Creuse ',
    '(24) - Dordogne',
    '(25) - Doubs',
    '(26) - Drôme',
    '(27) - Eure',
    '(28) - Eure-et-loir',
    '(29) - Finistère',
    '(30) - Gard',
    '(31) - Haute-garonne',
    '(32) - Gers',
    '(33) - Gironde',
    '(34) - Hérault ',
    '(35) - Ille-et-vilaine ',
    '(36) - Indre ',
    '(37) - Indre-et-loire ',
    '(38) - Isère',
    '(39) - Jura',
    '(40) - Landes',
    '(41) - Loir-et-cher',
    '(42) - Loire',
    '(43) - Haute-loire',
    '(44) - Loire-atlantique',
    '(45) - Loiret',
    '(46) - Lot',
    '(47) - Lot-et-garonne',
    '(48) - Lozère',
    '(49) - Maine-et-loire',
    '(50) - Manche',
    '(51) - Marne',
    '(52) - Haute-marne',
    '(53) - Mayenne',
    '(54) - Meurthe-et-moselle',
    '(55) - Meuse',
    '(56) - Morbihan',
    '(57) - Moselle',
    '(58) - Nièvre',
    '(59) - Nord',
    '(60) - Oise',
    '(61) - Orne',
    '(62) - Pas-de-calais',
    '(63) - Puy-de-dôme',
    '(64) - Pyrénées-atlantiques',
    '(65) - Hautes-Pyrénées',
    '(66) - Pyrénées-orientales',
    '(67) - Bas-rhin',
    '(68) - Haut-rhin',
    '(69) - Rhône',
    '(70) - Haute-saône',
    '(71) - Saône-et-loire',
    '(72) - Sarthe',
    '(73) - Savoie',
    '(74) - Haute-savoie',
    '(75) - Paris',
    '(76) - Seine-maritime',
    '(77) - Seine-et-marne',
    '(78) - Yvelines',
    '(79) - Deux-sèvres',
    '(80) - Somme',
    '(81) - Tarn',
    '(82) - Tarn-et-garonne',
    '(83) - Var',
    '(84) - Vaucluse',
    '(85) - Vendée',
    '(86) - Vienne',
    '(87) - Haute-vienne',
    '(88) - Vosges',
    '(89) - Yonne',
    '(90) - Territoire de belfort',
    '(91) - Essonne',
    '(92) - Hauts-de-seine',
    '(93) - Seine-Saint-Denis',
    '(94) - Val-de-marne',
    '(95) - Val-d\'oise'
}

export class Course implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public place?: string,
        public price?: number,
        public department?: CourseDept,
        public raceName?: string,
        public raceType?: CourseType,
        public organisateur?: string,
        public organizer?: BaseEntity,
        public participants?: BaseEntity[],
        public volunteers?: BaseEntity[],
    ) {
    }
}
