import React, { useContext } from 'react';
import { MdArrowDropUp } from 'react-icons/md';
import { DctAccordion, DctItem, DctItemHeading } from '@dctjs/react';

import {
  AccordionComponentSchema,
  CardComponentSchema,
  CarouselComponentSchema,
  LinkComponentSchema,
  PageBuilderBaseComponentType,
} from '@/shared-data';
import { FormInput } from '@/shared-ui';
import { MainActions, MainContext } from '../../main.provider';

const componentSchema = (componentType: string | undefined) => {
  switch(componentType) {
    case 'ACCORDION':
      return AccordionComponentSchema;
    case 'CAROUSEL':
      return CarouselComponentSchema;
    case 'CARD':
      return CardComponentSchema;
    case 'LINK':
      return LinkComponentSchema;
    default:
      return CardComponentSchema;
  }
}

export interface InputConfirmationProps {
  component: PageBuilderBaseComponentType;
}

export const InputConfirmation: React.FC<InputConfirmationProps> = ({
  component,
}) => {
  const mainContext = useContext(MainContext);

  const updateModel = (comp: PageBuilderBaseComponentType) => {
    mainContext?.dispatch({
      type: MainActions.UPDATE_CONTENT,
      payload: comp,
    });
  };

  return (
    <DctAccordion
      disabled={false}
      className="bg-green-50 m-2 overflow-hidden rounded-lg"
    >
      <DctItemHeading slot="heading" animateIcons={true}>
        <span slot="start">
          <MdArrowDropUp size={24} />
        </span>
        <div className="capitalize" slot="heading">{(component.componentType as string).toLocaleLowerCase()}</div>
        <div className="capitalize" slot="sub-heading">{component.id}</div>
      </DctItemHeading>

      {Object.keys(componentSchema(component.componentType).shape)
        .filter((key) => !['id', 'componentType'].includes(key))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((key) => !Array.isArray((component as any)[key]))
        .map((key) => {
          return (
            <DctItem key={key} className="">
              <FormInput
                label={key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={(component as any)[key]}
                onChange={(e) => updateModel(component)}
                type="text"
              ></FormInput>
            </DctItem>
          );
        })}
    </DctAccordion>
  );
};
