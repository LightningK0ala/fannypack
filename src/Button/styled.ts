import { palette, theme } from 'styled-tools';
import { darken } from 'polished';
import _Button from 'reakit/Button';

import styled, { css, space } from '../styled';
import Icon, { IconProps } from '../Icon/Icon';
import { ButtonProps } from './Button';

export const isInteractive = (props: any) =>
  !props.isStatic && !props.isLoading && !props.disabled && props.kind !== 'link';

const sizeProperties: any = {
  small: css`
    & {
      font-size: ${theme('fannypack.fontSizes.100')}em;
      height: ${space(8)}em;
      padding: 0 ${space(2)}rem;
    }
    & {
      ${theme('fannypack.Button.sizes.small')};
    }
  `,
  medium: css`
    & {
      height: ${space(12)}em;
      padding: 0 ${space(5)}rem;
    }
    & {
      ${theme('fannypack.Button.sizes.medium')};
    }
  `,
  large: css`
    & {
      font-size: ${theme('fannypack.fontSizes.300')}em;
      height: ${space(12)}em;
      padding: 0 ${space(6)}rem;
    }
    & {
      ${theme('fannypack.Button.sizes.large')};
    }
  `
};

const linkProperties = css`
  & {
    border: 0;
    background: unset;
    color: ${(props: any) => (props.palette === 'default' ? palette('text')(props) : palette()(props))};
    fill: ${(props: any) => (props.palette === 'default' ? palette('text')(props) : palette()(props))};
    text-decoration: underline;

    &:hover {
      color: ${(props: any) =>
        props.palette === 'default' ? darken(0.5, palette('text')(props)) : darken(0.5, palette()(props))};
      fill: ${(props: any) =>
        props.palette === 'default' ? darken(0.5, palette('text')(props)) : darken(0.5, palette()(props))};
    }
  }
  & {
    ${theme('fannypack.Button.link')};
  }
`;
const outlinedProperties = css`
  & {
    background-color: unset;
    border: 1px solid ${palette()};
    color: ${palette()};
    fill: ${palette()};

    ${props =>
      isInteractive(props) &&
      css`
        &:hover {
          background-color: ${palette()};
          color: ${(props: any) => palette(`${props.palette}Inverted`)(props)};
          fill: ${(props: any) => palette(`${props.palette}Inverted`)(props)};
        }
      `};
  }
  & {
    ${theme('fannypack.Button.outlined')};
  }
`;
const ghostProperties = css<ButtonProps>`
  & {
    background-color: unset;
    border: unset;
    color: ${props => (props.palette === 'default' ? palette('defaultInverted') : palette())};
    fill: ${props => (props.palette === 'default' ? palette('defaultInverted') : palette())};

    &:hover {
      background-color: ${(props: any) => darken(0.05, palette('default')(props))};
    }
    &:hover:active {
      background-color: ${(props: any) => darken(0.1, palette('default')(props))};
    }
  }
  & {
    ${theme('fannypack.Button.ghost')};
  }
`;

const disabledProperties = css`
  & {
    cursor: not-allowed;
    opacity: 0.7;
    outline: unset;
    pointer-events: unset;
  }
  & {
    ${theme('fannypack.Button.disabled')};
  }
`;

const staticProperties = css`
  & {
    cursor: default;
    outline: unset;

    &:focus {
      box-shadow: unset !important;
      outline: unset !important;
    }
  }
  & {
    ${theme('fannypack.Button.static')};
  }
`;

const interactiveProperties = css`
  &:hover {
    background-color: ${(props: any) => darken(0.05, palette()(props))};
  }
  &:hover:active {
    background-color: ${(props: any) => darken(0.1, palette()(props))};
  }
  & {
    ${theme('fannypack.Button.interactive')};
  }
`;
const loadingProperties = css`
  & {
    cursor: not-allowed;

    &:focus {
      box-shadow: unset !important;
      outline: unset !important;
    }
  }
  & {
    ${theme('fannypack.Button.loading')};
  }
`;

export const ButtonIcon = styled(Icon)<IconProps & { isAfter: boolean; isBefore: boolean }>`
  ${props =>
    props.isBefore &&
    css`
      margin-left: -${space(1)}em;
      margin-right: ${space(2)}em;
    `};

  ${props =>
    props.isAfter &&
    css`
      margin-left: ${space(2)}em;
      margin-right: -${space(1)}em;
    `};

  & {
    ${theme('fannypack.Button.Icon.base')};
  }
`;

const Button = styled(_Button)<ButtonProps & { styledSize: any }>`
  align-items: center;
  background-color: ${palette()};
  border-radius: 4px;
  color: ${(props: any) => palette(`${props.palette}Inverted`)(props)};
  fill: ${(props: any) => palette(`${props.palette}Inverted`)(props)};
  cursor: pointer;
  display: inline-flex;
  font-weight: ${theme('fannypack.fontWeights.semibold')};
  height: 2.5em;
  justify-content: center;
  padding: 0 0.8rem;
  text-decoration: none;

  &:focus {
    outline: unset;
    z-index: 2;
    box-shadow: ${props => palette(props.palette === 'default' ? 'primary' : `${props.palette}300`)(props)} 0px 0px 0px
      2px;
  }

  &[disabled] {
    ${disabledProperties};
  }

  & {
    ${theme('fannypack.Button.base')};
  }

  ${props =>
    props.palette === 'default' &&
    css`
      border: 1px solid ${palette('gray100')};
    `};

  & {
    ${theme('fannypack.Button.base')};
  }

  ${props => props.styledSize && sizeProperties[props.styledSize || '']};

  ${props => props.isLoading && loadingProperties};
  ${props => props.isStatic && staticProperties};
  ${props => (isInteractive(props) ? interactiveProperties : '')};

  ${props => props.kind === 'outlined' && outlinedProperties};
  ${props => props.kind === 'link' && linkProperties};
  ${props => props.kind === 'ghost' && ghostProperties};
`;

export default Button;
