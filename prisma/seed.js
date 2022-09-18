import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.board.create({
    data: {
      title: 'Roadmap',
      Column: {
        create: [
          {
            title: 'Now',
            task: {
              create: [
                {
                  title: 'Launch version one',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Launch privately to our waitlist',
                        complete: false,
                      },
                      {
                        title: 'Launch publicly on PH, HN, etc.',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title:
                    'Review early feedback and plan next steps for roadmap',
                  description:
                    "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
                  Sub_Task: {
                    create: [
                      {
                        title: 'Interview 10 customers',
                        complete: false,
                      },
                      {
                        title:
                          'Review common customer pain points and suggestions',
                        complete: false,
                      },
                      {
                        title: 'Outline next steps for our roadmap',
                        complete: false,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Next',
          },
          {
            title: 'Later',
          },
        ],
      },
    },
  });

  await prisma.board.create({
    data: {
      title: 'Marketing Plan',
      Column: {
        create: [
          {
            title: 'Todo',
            task: {
              create: [
                {
                  title: 'Plan Product Hunt launch',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Find hunter',
                        complete: false,
                      },
                      {
                        title: 'Gather assets',
                        complete: false,
                      },
                      {
                        title: 'Draft product page',
                        complete: false,
                      },
                      {
                        title: 'Notify customers',
                        complete: false,
                      },
                      {
                        title: 'Notify network',
                        complete: false,
                      },
                      {
                        title: 'Launch!',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Share on Show HN',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Draft out HN post',
                        complete: false,
                      },
                      {
                        title: 'Get feedback and refine',
                        complete: false,
                      },
                      {
                        title: 'Publish post',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Write launch article to publish on multiple channels',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Write article',
                        complete: false,
                      },
                      {
                        title: 'Publish on LinkedIn',
                        complete: false,
                      },
                      {
                        title: 'Publish on Inndie Hackers',
                        complete: false,
                      },
                      {
                        title: 'Publish on Medium',
                        complete: false,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Doing',
          },
          {
            title: 'Done',
          },
        ],
      },
    },
  });

  await prisma.board.create({
    data: {
      title: 'Platform Launch',
      Column: {
        create: [
          {
            title: 'Todo',
            task: {
              create: [
                {
                  title: 'Build UI for onboarding flow',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Sign up page',
                        complete: true,
                      },
                      {
                        title: 'Sign in page',
                        complete: false,
                      },
                      {
                        title: 'Welcome page',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Build UI for search',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Search page',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Build settings UI',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Account page',
                        complete: false,
                      },
                      {
                        title: 'Billing page',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'QA and test all major user journeys',
                  description:
                    'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Internal testing',
                        complete: false,
                      },
                      {
                        title: 'External testing',
                        complete: false,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Doing',
            task: {
              create: [
                {
                  title: 'Design settings and search pages',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Settings - Account page',
                        complete: true,
                      },
                      {
                        title: 'Settings - Billing page',
                        complete: true,
                      },
                      {
                        title: 'Search page',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Add account management endpoints',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Upgrade plan',
                        complete: true,
                      },
                      {
                        title: 'Cancel plan',
                        complete: true,
                      },
                      {
                        title: 'Update payment method',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Design onboarding flow',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Sign up page',
                        complete: true,
                      },
                      {
                        title: 'Sign in page',
                        complete: false,
                      },
                      {
                        title: 'Welcome page',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Add search enpoints',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Add search endpoint',
                        complete: true,
                      },
                      {
                        title: 'Define search filters',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title: 'Add authentication endpoints',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Define user model',
                        complete: true,
                      },
                      {
                        title: 'Add auth endpoints',
                        complete: false,
                      },
                    ],
                  },
                },
                {
                  title:
                    'Research pricing points of various competitors and trial different business models',
                  description:
                    "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the Sub_Task until we have a coherent proposition.",
                  Sub_Task: {
                    create: [
                      {
                        title:
                          'Research competitor pricing and business models',
                        complete: true,
                      },
                      {
                        title:
                          'Outline a business model that works for our solution',
                        complete: false,
                      },
                      {
                        title:
                          'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                        complete: false,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Done',
            task: {
              create: [
                {
                  title: 'Conduct 5 wireframe tests',
                  description:
                    'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Complete 5 wireframe prototype tests',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title: 'Create wireframe prototype',
                  description:
                    'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
                  Sub_Task: {
                    create: [
                      {
                        title:
                          'Create clickable wireframe prototype in Balsamiq',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title: 'Review results of usability tests and iterate',
                  description:
                    "Keep iterating through the Sub_Task until we're clear on the core concepts for the app.",
                  Sub_Task: {
                    create: [
                      {
                        title:
                          'Meet to review notes from previous tests and plan changes',
                        complete: true,
                      },
                      {
                        title: 'Make changes to paper prototypes',
                        complete: true,
                      },
                      {
                        title: 'Conduct 5 usability tests',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title:
                    'Create paper prototypes and conduct 10 usability tests with potential customers',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Create paper prototypes for version one',
                        complete: true,
                      },
                      {
                        title: 'Complete 10 usability tests',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title: 'Market discovery',
                  description:
                    'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Interview 10 prospective customers',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title: 'Competitor analysis',
                  description: '',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Find direct and indirect competitors',
                        complete: true,
                      },
                      {
                        title: 'SWOT analysis for each competitor',
                        complete: true,
                      },
                    ],
                  },
                },
                {
                  title: 'Research the market',
                  description:
                    'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
                  Sub_Task: {
                    create: [
                      {
                        title: 'Write up research analysis',
                        complete: true,
                      },
                      {
                        title: 'Calculate TAM',
                        complete: true,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
