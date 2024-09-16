import Instructor, { InstructorClient } from '@instructor-ai/instructor';

import { oaiClient } from './open-ai-client';

// export const INSTRUCTOR_MODEL = 'gpt-4o';
export const INSTRUCTOR_MODEL = 'gpt-4o-2024-08-06';

export const instructorClient: InstructorClient<typeof oaiClient> = Instructor({
  client: oaiClient,
  mode: 'JSON',
});
