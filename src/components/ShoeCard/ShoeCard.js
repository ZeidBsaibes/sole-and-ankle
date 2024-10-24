import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const flashText = (variant) => {
    if (variant === "on-sale") {
      return "Sale";
    } else if (variant === "new-release") {
      return "Just Released!";
    } else {
      return null;
    }
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {flashText(variant) && (
            <FlashTag variant={variant}>{flashText(variant)}</FlashTag>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  max-width: 344px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(props) =>
    props.variant === "on-sale" ? COLORS.gray[700] : "inherit"};
  text-decoration: ${(props) =>
    props.variant === "on-sale" ? "line-through" : "inherit"};
`;

const SalePrice = styled(Price)`
  color: ${COLORS.primary};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const FlashTag = styled.span`
  font-weight: ${WEIGHTS.medium};
  background-color: ${(props) =>
    props.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
  color: ${COLORS.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  border-radius: 2px;
  padding: 8px 10px 8px 10px;
  height: 32px;
  top: 12px;
  right: -4px;
  text-align: center;
`;

export default ShoeCard;
