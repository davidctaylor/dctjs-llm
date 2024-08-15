// import { z } from 'zod';

export const ASSISTANT_CONTENT = `
It should be possible for a user to create an initial or new web page object and subsequently add page body and section
elements. The terms page and artcile are interchangeable. The terms body and content are interchangeable

If a page URL is not provided use the page Title in the following format <page-title-element>.

With the exception of the page URL, do not genertate content for the page but ask the user for addition inputs.

Prompt the user for additional information if required. For example, if a user adds a Component object to a 
Section but does not provide all of elements to build the object the user should be prompted to provide those 
elements. For example, a use may add a Carousel object and then be prompted for the number of Card Components required.

JSON fields labeled as 'id' should be auto-generated and unique with the JSON object. The naming 
convention should include the parent section name and component name together with an incremented 
sequence number using the format <section-1-component-name-1>.
`;

export const SYSTEM_CONTENT = `
Act as a web page builder that defines JSON objects that will be used to build Web pages.

Make sure that any  content provided for the web page is suitable for a family audience. 
`;

// enum PageBuilderComponentType {
//   ACCORDIAN = 'accordian',
//   BUTTON = 'button',
//   CARD = 'card',
//   CAROUSEL = 'carousel',
// }

// const PageBuilderComponentEnum = z.nativeEnum(PageBuilderComponentType);

// const BaseCompoentSchema = z.object({
//   componentType: z.nativeEnum(PageBuilderComponentType),
//   id: z.string().optional(),
// });

// const AccordianCompoentSchema = BaseCompoentSchema.extend({
//   items: z.array(
//     z.object({
//       heading: z.string(),
//       content: z.string(),
//     })
//   ),
// });

// enum ButtonComponentColorType {
//   'primary',
//   'secondary',
// }

// enum ButtonComponentStyleType {
//   'elevated',
//   'filled',
//   'outlined',
//   'text',
// }

// const ButtonComponentSchema = BaseCompoentSchema.extend({
//   arialLabel: z.string().optional(),
//   buttonColor: z.nativeEnum(ButtonComponentColorType).optional(),
//   buttonStyle: z.nativeEnum(ButtonComponentStyleType).optional(),
//   disabled: z.boolean().optional(),
// });

// enum CardComponentBorderType {
//   'elevated',
//   'none',
//   'outlined',
// }

// const CardComponentSchema = BaseCompoentSchema.extend({
//   border: z.nativeEnum(CardComponentBorderType).optional(),
//   href: z.string().optional(),
//   title: z.string().optional(),
//   subTitle: z.string().optional(),
// });

// const CarouselComponentSchema = BaseCompoentSchema.extend({
//   cards: z.array(CardComponentSchema),
//   headerText: z.string(),
// });

// const PageBuilderSchema = z
//   .object({
//     page: z
//       .object({
//         body: z.string().optional(),
//         heading: z
//           .object({
//             heading: z.string(),
//             id: z.string(),
//           })
//           .optional()
//           .describe('The page heading'),
//         id: z.string(),
//         name: z.string().optional(),
//         title: z.string(),
//         url: z.string(),
//         sections: z
//           .array(
//             z.object({
//               components: z
//                 .array(z.union([AccordianCompoentSchema, CardComponentSchema]))
//                 .optional(),
//               heading: z.string(),
//               id: z.string(),
//             })
//           )
//           .optional(),
//       })
//       .describe('Page object'),
//   })
//   .describe('PageBuilder object');

// const AddtionalPromptSchema = z
//   .object({
//     questions: z.array(z.string()),
//   })
//   .optional()
//   .describe(
//     'Prompts the user for additional information to complete the PageBuilder object'
//   );

// export const PageBuilderPromptSchema = z.object({
//   prompts: AddtionalPromptSchema,
//   page: PageBuilderSchema,
// });
