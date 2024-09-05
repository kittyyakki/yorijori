import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./RecipeList.css";
import RecipeFavoriteButton from "components/features/recipe/RecipeFavoriteButton";
import UserFeature from "components/util/UserFeature";
import { axios, defaultErrorHandler } from "utils";
import { useInfiniteScroll, usePromiseThrottle } from "hooks";

const category = [
  { name: "전체", query: "" },
  { name: "한식", query: "한식" },
  { name: "양식", query: "양식" },
  { name: "일식", query: "일식" },
  { name: "중식", query: "중식" },
  { name: "분식", query: "분식" },
  { name: "간식", query: "간식" },
  { name: "베이킹", query: "베이킹" },
];

export default function RecipeList() {
  const [throttleInterval, setThrottleInterval] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(category[0].query);

  const throttle = usePromiseThrottle(throttleInterval);
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state?.searchTerm || "";

  // 페이지 번호와 카테고리/검색어에 따라 레시피 목록을 서버에서 가져옵니다.
  const fetchPage = useCallback(
    async (page) => {
      let response = await axios.get(`/api/recipes`, {
        params: {
          page: 0,
          size: 8,
          category: selectedCategory,
          term: searchTerm,
        },
      });
      setThrottleInterval(0);
      return response.data;
    },
    [searchTerm, selectedCategory],
  );

  // 무한 스크롤 기능
  const { ref, content, reset } = useInfiniteScroll(
    throttle(fetchPage),
    (error) => {
      setThrottleInterval(3000);
      defaultErrorHandler(error);
    },
  );
  // 카테고리 및 레시피 클릭 이벤트
  const handleCategoryClick = async (query) => {
    setSelectedCategory(query);
    navigate("/recipes", { state: { searchTerm: "" } });

    reset();
  };

  // selectedCategory 또는 searchTerm이 변경되면 레시피 목록을 초기화하고 새로 불러옵니다.
  useEffect(() => {
    reset();
  }, [selectedCategory, searchTerm, reset]);

  return (
    <div className="recipeList_wrap">
      <div className="recipe_category_wrap">
        <div className="category_filter">
          <UserFeature>
            <Link to="/recipes/write" className="create_recipe_button">
              게시글쓰기
            </Link>
          </UserFeature>
          {category.map((cat) => (
            <button
              key={cat.query}
              onClick={() => handleCategoryClick(cat.query)}
              className={`category_button ${selectedCategory === cat.query ? "active" : ""}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="recipe_banner_wrap">
        {content.length > 0 ? (
          content.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <br></br>
            <div>
              <img
                src="/images/suprize.png"
                alt="recipe_surchImage"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <br></br>
            <div style={{ fontSize: "170%", textAlign: "center" }}>
              "{searchTerm}"<br />
              검색 결과가 없습니다.
            </div>
          </div>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div aria-label="scroll-trigger" ref={ref} />
    </div>
  );
}

const RecipeCard = memo(({ recipe }) => {
  // 레시피를 클릭하면 해당 레시피의 조회수를 증가시킵니다.
  const handleRecipeClick = async () => {
    try {
      await axios.put(`/api/recipes/${recipe.id}/view-count`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  };

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      key={recipe.id}
      className="recipe_state_wrap"
      onClick={handleRecipeClick}
    >
      <div className="recipe_text_wrap relative">
        <span className="recipe_state_name">{recipe.title}</span>
        <span className="recipe_state_profileImage">
          <img
            src={recipe.member.profileImage}
            alt={`${recipe.member.nickname}'s profile`}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </span>
        <span className="recipe_state_viewcount">{recipe.member.nickname}</span>
        <span className="recipe_state_level">{recipe.level} level</span>
        <span className="recipe_state_servings">{recipe.servings}인분</span>
        <span className="recipe_state_viewcount">
          조회수 {recipe.viewCount}
        </span>
        <RecipeFavoriteButton
          recipe={recipe}
          className="absolute top-2 right-2"
        />
      </div>
      <div className="recipe_imageUrl">
        <img src={recipe.bannerImage} alt="recipe_bannerImage" />
      </div>
    </Link>
  );
});
