import { PrismaClient, TopicStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const topics = [
    {
      title: 'Will Bitcoin hit $100k before 2026?',
      description: 'Analysts are divided as market volatility increases. Key resistance at $95k.',
      yesPool: 50000,
      noPool: 32000,
      participants: 1240,
      tags: ['Crypto', 'Finance'],
      endsAt: new Date('2025-12-31'),
      status: TopicStatus.ACTIVE,
    },
    {
      title: 'Real Madrid to win Champions League?',
      description: 'Mbappe injury raises concerns for the upcoming quarter-finals.',
      yesPool: 12000,
      noPool: 8000,
      participants: 850,
      tags: ['Sports', 'Football'],
      endsAt: new Date('2025-06-01'),
      status: TopicStatus.ACTIVE,
    },
    {
      title: 'Will GTA VI release in Q1 2026?',
      description: 'Rockstar hints at delays in recent earnings call.',
      yesPool: 150000,
      noPool: 20000,
      participants: 5000,
      tags: ['Gaming', 'Tech'],
      endsAt: new Date('2026-03-31'),
      status: TopicStatus.ACTIVE,
    },
  ];

  for (const topic of topics) {
    await prisma.topic.create({ data: topic });
  }

  console.log('Created ' + topics.length + ' topics');
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
