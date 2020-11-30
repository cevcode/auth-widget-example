export enum ButtonTypes {
    submit = 'submit',
    button = 'button',
    default = 'button',
}

export enum PositionTypes {
    left = 'flex-start',
    right = 'flex-end',
    center = 'center',
    default = 'flex-start',
}

export enum ComponentSizesTypes {
    s = 's',
    l = 'l',
    m = 'm',
    full = 'full',
    auto = 'auto',
    default = 'default',
}

export enum FontSizeTypes {
    xs = 'xs',
    s = 's',
    m = 'm',
    l = 'l',
    xl = 'xl',
    xxl = 'xxl',
    default = 'default',
}

export enum WeightTypes {
    w400 = '400',
    w500 = '500',
    w600 = '600',
    w700 = '700',
    w800 = '800',
    default = '400',
}

export enum DirectionTypes {
    row = 'row',
    column = 'column',
    default = 'column',
}

export enum JustifyContentTypes {
    flexStart = 'flexStart',
    center = 'center',
    stretch = 'stretch',
    flexEnd = 'flexEnd',
    spaceBetween = 'spaceBetween',
    spaceAround = 'spaceAround',
    default = 'default',
}

export enum AlignItemsTypes {
    flexStart = 'flexStart',
    center = 'center',
    stretch = 'stretch',
    flexEnd = 'flexEnd',
    spaceBetween = 'spaceBetween',
    spaceAround = 'spaceAround',
    default = 'default',
}

export enum AlignTextTypes {
    center = 'center',
    left = 'left',
    right = 'right',
    default = 'left',
}

export enum InputTypes {
    text = 'text',
    number = 'number',
    search = 'search',
    textarea = 'textarea',
}

export interface ISpaceTypes {
    margin?: string;
    mbottom?: string;
    mtop?: string;
    mleft?: string;
    mright?: string;
    padding?: string;
    pbottom?: string;
    ptop?: string;
    pleft?: string;
    pright?: string;
}
