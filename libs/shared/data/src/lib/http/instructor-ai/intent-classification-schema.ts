import { z } from 'zod';

export enum IntentClassificationEnum {
  INVALID = 'INVALID',
  PAGE = 'PAGE',
  SECTION = 'SECTION',
}

export const IntentClassificationEnumInternal = z.nativeEnum(
  IntentClassificationEnum
);

export const IntentClassificationSchema = z
  .object({
    intents: z.array(
      z.object({
        intent: IntentClassificationEnumInternal,
        text: z
          .union([z.string(), z.undefined()])
          .describe('Input text for intent'),
      })
    ),
  })
  .describe('Determine the intent of the users input');

export type PageBuilderIntentClassificationType = z.infer<
  typeof IntentClassificationSchema
>;
