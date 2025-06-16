import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react/compat';
import {ArrowRight, Rocket} from 'lucide-react';
import {motion} from 'motion/react';

import {$repos} from '~/pages/home/model';

import {Profile} from '~/features/profile';
import {Timestamp} from '~/features/timestamp';

import {UserEntity} from '~/shared/api/types';
import {Page} from '~/shared/ui';
import {Badge} from '~/shared/ui/badge';
import {Button} from '~/shared/ui/button';
import {Card, CardFooter, CardHeader} from '~/shared/ui/card';
import {Separator} from '~/shared/ui/separator';

import Fresco from './assets/fresco.webp';

export const HomePage = () => {
  const repos = useUnit($repos);
  return (
    <Page className="pt-16">
      <div className="min-h-screen w-full px-10 sm:px-0 sm:max-w-xl lg:max-w-2xl">
        <Link to="/explore" className="block w-fit mx-auto mt-16 mb-12">
          <motion.div
            initial={{scale: 0}}
            whileInView={{scale: 1.0, transition: {delay: 0.25}}}
            whileTap={{
              scale: 0.8,
              transition: {duration: 0.1, type: 'spring', stiffness: 400, damping: 10},
            }}
            viewport={{once: true}}
          >
            <Button className="rounded-full bg-primary group gap-0">
              Discussions
              <ArrowRight className="w-0! group-hover:w-4! group-hover:ms-2 pt-px transition-all" />
            </Button>
          </motion.div>
        </Link>
        <img src={Fresco} width="500" height="300px" alt="" className="mx-auto" />
        <div className="mx-auto mt-10 overflow-hidden text-left">
          <h2 className="scroll-m-20 pb-3 text-3xl font-semibold tracking-tight first:mt-0">
            Release Notes
          </h2>
          <Separator />
          <div className="lg:flex lg:space-x-2">
            <div className="lg:flex-1">
              <p className="leading-7 mt-3">
                Publish a discussion. Leave there a comment. Reply to the comment.
              </p>
            </div>
            <div className="lg:flex-1">
              <p className="leading-7 mt-3">
                React with up to 3 emojis or labels to a discussion or comment.
              </p>
            </div>
          </div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">Coming soon</h4>
          <p className="leading-7 not-first:mt-3">
            Redesigned discussions. Metric charts. And search.
          </p>
        </div>
        <motion.div className="mt-10 flex flex-wrap gap-6">
          {repos.map((repo) => (
            <a href={repo.html_url} target="_blank" key={repo.id} className="w-full">
              <Card className="bg-background">
                <CardHeader>
                  <div className="flex justify-between items-center text-sm whitespace-nowrap">
                    <Profile
                      user={
                        new UserEntity({
                          id: '',
                          username: repo.description ?? 'Auxiliary repository.',
                          displayName: repo.full_name,
                          avatarUrl: repo.owner.avatar_url,
                        })
                      }
                      variant="md"
                      className="pointer-events-none"
                    />
                    <Timestamp
                      icon={<Rocket className="inline size-4 me-1 text-muted-foreground" />}
                      date={repo.pushed_at}
                    />
                  </div>
                </CardHeader>
                {repo.topics.length > 0 && (
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {...repo.topics.map((topic) => (
                        <Badge
                          variant="outline"
                          className="rounded-full font-normal text-sm hover:bg-primary hover:border-primary hover:text-background transition-none"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {repo.language && <Badge className="rounded-full">{repo.language}</Badge>}
                    </div>
                  </CardFooter>
                )}
              </Card>
            </a>
          ))}
        </motion.div>
      </div>
    </Page>
  );
};
