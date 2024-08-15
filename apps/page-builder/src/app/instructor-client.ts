import Instructor, { InstructorClient } from '@instructor-ai/instructor';

import { oaiClient } from './open-ai-client';

export const INSTRUCTOR_MODEL = 'gpt-4o';

export const instructorClient: InstructorClient<typeof oaiClient> = Instructor({
  client: oaiClient,
  mode: 'FUNCTIONS',
});
