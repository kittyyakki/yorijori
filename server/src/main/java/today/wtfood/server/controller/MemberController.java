package today.wtfood.server.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import today.wtfood.server.dto.GeneratedId;
import today.wtfood.server.dto.member.MemberCreateRequest;
import today.wtfood.server.dto.member.MemberDetail;
import today.wtfood.server.dto.member.MemberSummary;
import today.wtfood.server.dto.member.MemberUpdateRequest;
import today.wtfood.server.service.MemberService;

@RestController
@RequestMapping(path = "/members", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }


    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public GeneratedId<Long> create(
            @Validated
            MemberCreateRequest requestData
    ) {
        return new GeneratedId<>(memberService.createMember(requestData));
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public Page<MemberSummary> getMembers(
            @Validated
            PageRequest pageable
    ) {
        return memberService.getMembers(pageable);
    }

    @GetMapping("/{memberId}")
    @ResponseStatus(HttpStatus.OK)
    public MemberDetail getMember(
            @PathVariable
            long memberId
    ) {
        return memberService.getMember(memberId);
    }

    @PutMapping("/{memberId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateMember(
            @PathVariable
            long memberId,

            @Validated
            MemberUpdateRequest requestData
    ) {
        memberService.updateMember(memberId, requestData);
    }

    @DeleteMapping("/{memberId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(
            @PathVariable
            long memberId
    ) {
        memberService.deleteMember(memberId);
    }

}
