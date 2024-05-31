import React from 'react';
import CardCarousel from "@/components/Carousel";
import Album from "@/components/album";
import { serverFetch } from "@/utils/server/auth";

const UserPageLeftSide = async ({ params }) => {
  const userPageId = params.id;
  const user = await serverFetch(`http://localhost:5135/api/v1/users/${userPageId}`)

  return (
      <div>
        <CardCarousel/>
        <Album/>
      </div>
  );
};

export default UserPageLeftSide;