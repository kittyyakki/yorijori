package today.wtfood.server.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.server.ResponseStatusException;
import today.wtfood.server.dto.ErrorResponse;

@Getter
public abstract class BaseResponseStatusException extends ResponseStatusException {

    /**
     * 필드 이름
     */
    private final String field;

    @Override
    abstract public @NonNull HttpStatusCode getStatusCode();

    public BaseResponseStatusException(@NonNull String reason) {
        this(reason, null, null);
    }

    public BaseResponseStatusException(@NonNull String reason, @Nullable String field) {
        this(reason, field, null);
    }

    public BaseResponseStatusException(@NonNull String reason, @Nullable Throwable cause) {
        this(reason, null, cause);
    }

    public BaseResponseStatusException(@NonNull String reason, @Nullable String field, @Nullable Throwable cause) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason, cause);
        this.field = field;
    }

    public final ErrorResponse toErrorResponse() {
        return new ErrorResponse(getStatusCode().value(), field, getReason() != null ? getReason() : "알 수 없는 오류가 발생했습니다");
    }

}