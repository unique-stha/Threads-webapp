import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    console.log('Fetching communities with searchParams:', searchParams);

    const result = await fetchCommunities({
      searchString: searchParams.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    });

    console.log('Communities fetch result:', {
      count: result.communities.length,
      isNext: result.isNext
    });

    return (
      <>
        <h1 className='head-text'>Communities</h1>

        <div className='mt-5'>
          <Searchbar routeType='communities' />
        </div>

        <section className='mt-9 flex flex-wrap gap-4'>
          {result.communities.length === 0 ? (
            <p className='no-result'>No Result</p>
          ) : (
            <>
              {result.communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio={community.bio}
                  members={community.members}
                />
              ))}
            </>
          )}
        </section>

        <Pagination
          path='communities'
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    return <div>Error loading communities. Please try again later.</div>;
  }
}

export default Page;