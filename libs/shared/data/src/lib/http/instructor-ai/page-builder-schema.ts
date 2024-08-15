import { z } from 'zod';

enum PageBuilderComponentType {
  ACCORDIAN = 'accordian',
  BUTTON = 'button',
  CARD = 'card',
  CAROUSEL = 'carousel',
}

const PageBuilderComponentEnum = z.nativeEnum(PageBuilderComponentType);

const BaseCompoentSchema = z.object({
  componentType: z.nativeEnum(PageBuilderComponentType),
  id: z.string().optional(),
});

const AccordianCompoentSchema = BaseCompoentSchema.extend({
  items: z.array(
    z.object({
      heading: z.string(),
      content: z.string(),
    })
  ),
});

enum ButtonComponentColorType {
  'primary',
  'secondary',
}

enum ButtonComponentStyleType {
  'elevated',
  'filled',
  'outlined',
  'text',
}

const ButtonComponentSchema = BaseCompoentSchema.extend({
  arialLabel: z.string().optional(),
  buttonColor: z.nativeEnum(ButtonComponentColorType).optional(),
  buttonStyle: z.nativeEnum(ButtonComponentStyleType).optional(),
  disabled: z.boolean().optional(),
});

enum CardComponentBorderType {
  'elevated',
  'none',
  'outlined',
}

const CardComponentSchema = BaseCompoentSchema.extend({
  border: z.nativeEnum(CardComponentBorderType).optional(),
  href: z.string().optional(),
  title: z.string().optional(),
  subTitle: z.string().optional(),
});

const CarouselComponentSchema = BaseCompoentSchema.extend({
  cards: z.array(CardComponentSchema),
  headerText: z.string(),
});

const PageBuilderSchema = z
  .object({
    page: z
      .object({
        body: z.string().optional(),
        heading: z
          .object({
            heading: z.string(),
            id: z.string(),
          })
          .optional()
          .describe('The page heading'),
        id: z.string(),
        name: z.string().optional(),
        title: z.string(),
        url: z.string(),
        sections: z
          .array(
            z.object({
              components: z
                .array(z.union([AccordianCompoentSchema, CardComponentSchema]))
                .optional(),
              heading: z.string(),
              id: z.string(),
            })
          )
          .optional(),
      })
      .describe('Page object'),
  })
  .describe('PageBuilder object');

const AddtionalPromptSchema = z
  .object({
    questions: z.array(z.string()),
  })
  .optional()
  .describe(
    'Prompts the user for additional information to complete the PageBuilder object'
  );

export const PageBuilderPromptSchema = z.object({
  prompts: AddtionalPromptSchema,
  page: PageBuilderSchema,
});

export type PageBuilderPromptType = z.infer<typeof PageBuilderPromptSchema>;
