import { PageBuilderRequestType } from "./page-builder-schema";

export const TEST_RESPONSE = {
  componentType: 'PAGE_CONTAINER',
  id: 'page_001',
  sections: [
    {
      componentType: 'PAGE_SECTION',
      components: [
        {
          id: 'section-3-carousel-1',
          componentType: 'CAROUSEL',
          cards: [
            {
              id: 'section-3-carousel-1-card-0',
              componentType: 'CARD',
              imageRef: '/images/mesa-verde.jpg',
            },
            {
              id: 'section-3-carousel-1-card-1',
              componentType: 'CARD',
              imageRef: '/images/great-sand-dunes.jpg',
            },
            {
              id: 'section-3-carousel-1-card-2',
              componentType: 'CARD',
              imageRef: '/images/garden.jpg',
            },
          ],
          title: 'Image gallery of Colorado State Parks',
        },
      ],
      id: 'section-3',
    },
    {
      componentType: 'PAGE_SECTION',
      components: [
        {
          id: 'section-4-accordion-0',
          componentType: 'ACCORDION',
          heading: 'What is the best time to visit Mesa Verde?',
          content:
            'The best time to visit Mesa Verde is in the spring and fall when the weather is mild and the park is less crowded.',
        },
        {
          id: 'section-4-accordion-1',
          componentType: 'ACCORDION',
          heading: 'Are guided tours available?',
          content:
            'Yes, guided tours are available, and they are highly recommended to get the most out of your visit.',
        },
        {
          id: 'section-4-accordion-2',
          componentType: 'ACCORDION',
          heading: 'What should I bring for a visit?',
          content:
            'Visitors should bring water, a hat, sunscreen, and comfortable walking shoes for their trip.',
        },
        {
          id: 'section-4-link-3',
          componentType: 'LINK',
          href: 'http://123.com',
          label: 'click me!',
        },
      ],
      heading: 'Frequently asked questions',
      id: 'section-4',
    },
  ],
  title: {
    componentType: 'PAGE_TITLE',
    title: 'Colorful Colorado State parks',
    id: 'title_001',
  },
  pageContent: {
    content:
      '**Mesa Verde National Park**\n\nMesa Verde National Park is a testament to the Ancestral Puebloan culture, featuring some of the most notable and best-preserved cliff dwellings in the world. Designated as a UNESCO World Heritage Site, visitors to Mesa Verde are immersed in the history and culture of the people who lived there for over 700 years. Whether you opt for a guided tour of Cliff Palace or explore the Mesa Top Loop Road, each visit is a journey back in time.\n\n**Great Sand Dunes National Park**\n\nGreat Sand Dunes National Park and Preserve boasts the tallest dunes in North America, rising to over 750 feet. From hiking and sandboarding on the dunes to splashing in Medano Creek, this park offers unique activities set against a stunning natural backdrop. As the sun sets, the surrounding Sangre de Cristo Mountains create a dramatic skyline, making it a premier location for photography and stargazing.\n\n**Rocky Mountain National Park**\n\nRocky Mountain National Park is a majestic expanse of wilderness encompassing alpine lakes, rugged mountain peaks, and diverse ecosystems. Stretching over 415 square miles, the park is a haven for outdoor enthusiasts, offering opportunities for hiking, wildlife viewing, and camping. Trail Ridge Road, the highest continuous paved road in the U.S., provides breathtaking panoramic views, ensuring every visit is an unforgettable experience.',
    componentType: 'PAGE_CONTENT',
    id: 'content_001',
  },
  url: 'Colorful-Colorado-State-parks',
};
