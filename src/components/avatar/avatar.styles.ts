import { css } from "lit";

export const avatarStyles = css`
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--color-base-primary-200);
    color: var(--color-base-primary-900);
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .avatar__fallback {
    line-height: 1;
  }
`;
