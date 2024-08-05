package today.wtfood.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import today.wtfood.server.dto.noticedto.NoticeDetail;
import today.wtfood.server.dto.noticedto.NoticeSummary;
import today.wtfood.server.entity.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select n from Notice n")
    Page<NoticeSummary> getNotices(Pageable pageable);

    NoticeDetail findById(long id);

}
