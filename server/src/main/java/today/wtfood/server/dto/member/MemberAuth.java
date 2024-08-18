package today.wtfood.server.dto.member;

import today.wtfood.server.entity.Member;

/**
 * 회원 인증 응답 시 필요한 정보 DTO
 *
 * @implNote Projection for {@link Member}
 */
public interface MemberAuth extends IMember {

    String getNickname();

    String getProfileImage();

    Member.Role getRole();

}